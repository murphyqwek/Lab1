package org.example;

import com.fastcgi.FCGIInterface;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Objects;
import java.util.Timer;

import org.example.Parsing;

public class Main {
    public static void main(String[] args) throws IOException {
        FCGIInterface fcgiInterface = new FCGIInterface();

        while (fcgiInterface.FCGIaccept() >= 0) {
            String method = FCGIInterface.request.params.getProperty("REQUEST_METHOD");
            if (method.equals("POST")) {
                long startTime = System.nanoTime();
                FCGIInterface.request.inStream.fill();
                String body = "";
                try {
                    body = readRequestBody();
                    var data = Parsing.parseRequestBody(body);
                    long endTime = System.nanoTime();
                    long duration = (endTime - startTime) / 1_000_000;
                    if(Checker.isHit(data)) {
                        System.out.println(response(data.x(), data.y(), data.r(), "Попадание", duration));
                    }
                    else {
                        System.out.println(response(data.x(), data.y(), data.r(), "Мимо", duration));
                    }

                } catch (IOException e) {
                    System.out.println(error("Сервер получил неожиданный запрос: " + e.getMessage()));
                } catch (BodyParsingException e) {
                    System.out.println(error(e.getMessage() + "  " + body));
                }

            }
        }
    }

    private static String readRequestBody() throws IOException {
        String contentLengthStr = FCGIInterface.request.params.getProperty("CONTENT_LENGTH");
        int contentLength = contentLengthStr != null ? Integer.parseInt(contentLengthStr) : 0;

        if (contentLength <= 0) {
            return "";
        }

        byte[] bytes = new byte[contentLength];
        int totalRead = 0;

        while (totalRead < contentLength) {
            int bytesRead = FCGIInterface.request.inStream.read(bytes, totalRead, contentLength - totalRead);
            if (bytesRead == -1) {
                throw new IOException("Premature end of stream");
            }
            totalRead += bytesRead;
        }

        return new String(bytes, StandardCharsets.UTF_8);
    }

    private static String test(String  body) {
        String content = """
                %s
                """.formatted(body);
        return """
                Content-Type: application/json; charset=utf-8
                Content-Length: %d
                
                
                %s
                """.formatted(content.getBytes(StandardCharsets.UTF_8).length, content);
    }

    private static String response(float x, float y, float r, String result, long time) {
        String content = """
                {"x":"%.3f", "y":"%.3f", "r":"%.3f", "result":"%s", "time":"%d", "error_message":""}
                """.formatted(x, y, r, result, time);
        return """
                Content-Type: application/json; charset=utf-8
                Content-Length: %d
                
                
                %s
                """.formatted(content.getBytes(StandardCharsets.UTF_8).length, content);
    }

    private static String error(String errorMessage) {
        String content = """
                {"error_message":"%s"}
                """.formatted(errorMessage);
        return """
                Content-Type: application/json; charset=utf-8
                Content-Length: %d
                
                
                %s
                """.formatted(content.getBytes(StandardCharsets.UTF_8).length, content);
    }


}