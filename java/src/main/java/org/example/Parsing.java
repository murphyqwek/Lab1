package org.example;

public class Parsing {
    public static RequestData parseRequestBody(String body) throws BodyParsingException {
        String[] elements = body.split("\n");

        if (elements.length != 3) {
            throw new BodyParsingException("Сообщение пришло в неврерном формате");
        }
        float x, y, r;
        try {
            x = Float.parseFloat(elements[0]);
        }
        catch (NumberFormatException e) {
            throw new BodyParsingException("Параметр X должен был действительным числом");
        }

        try {
            y = Float.parseFloat(elements[1]);
        }
        catch (NumberFormatException e) {
            throw new BodyParsingException("Параметр Y должен был действительным числом");
        }

        try {
            r = Float.parseFloat(elements[2]);
        }

        catch (NumberFormatException e) {
            throw new BodyParsingException("Параметр R должен был действительным числом");
        }

        if(!checkX(x)) {
            throw new BodyParsingException("Параметр X находится вне границ");
        }

        if(!checkY(y)) {
            throw new BodyParsingException("Параметр Y находится вне границ");
        }

        if(!checkR(r)) {
            throw new BodyParsingException("Параметр R находися вне границ");
        }

        return new RequestData(x, y, r);
    }

    private static boolean checkX(float x) {
        return -5 <= x && x <= 3;
    }

    private static boolean checkY(float y) {
        return -5 <= y && y <= 3;
    }

    private static boolean checkR(float r) {
        return 1 <= r && r <= 4;
    }
}
