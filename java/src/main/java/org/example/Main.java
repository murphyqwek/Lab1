package org.example;

import com.fastcgi.FCGIInterface;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Objects;
import org.example.Parsing;

public class Main {
    public static void main(String[] args) throws IOException {
        FCGIInterface fcgiInterface = new FCGIInterface();

        while (fcgiInterface.FCGIaccept() >= 0) {
            String method = FCGIInterface.request.params.getProperty("REQUEST_METHOD");
            if (method.equals("POST")) {
                long time = System.nanoTime();
                FCGIInterface.request.inStream.fill();
                try {
                    String body = readRequestBody();
                    var data = Parsing.parseRequestBody(body);

                    if(Checker.isHit(data)) {

                    }
                } catch (IOException e) {
                    System.out.println(error("Сервер получил неожиданный запрос"));
                } catch (BodyParsingException e) {
                    System.out.println(error(e.getMessage()));
                }

            }
        }
    }

    private static String readRequestBody() throws IOException {
        StringBuilder sb = new StringBuilder();
        try (java.io.InputStreamReader reader = new java.io.InputStreamReader(System.in, StandardCharsets.UTF_8)) {
            char[] buffer = new char[1024];
            int bytesRead;
            while ((bytesRead = reader.read(buffer)) != -1) {
                sb.append(buffer, 0, bytesRead);
            }
        }
        return sb.toString();
    }


    private static String response(String text) {
        String content = """
                {"result":"%s"}
                """.formatted(text);
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