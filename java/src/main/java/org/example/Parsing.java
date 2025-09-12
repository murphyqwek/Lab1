package org.example;

import java.util.regex.Pattern;

public class Parsing {
    public static RequestData parseRequestBody(String body) throws BodyParsingException {
        String[] elements = body.split(",");

        if (elements.length != 3) {
            throw new BodyParsingException("Сообщение пришло в неврерном формате");
        }
        float x, y, r;
        if (validateDecimal(elements[0], 3)) {
            throw new BodyParsingException("Параметр X должен был действительным числом с максимум тремя знаками после запятой");
        }
        try {
            x = Float.parseFloat(elements[0].replace(',', '.'));
        }
        catch (NumberFormatException e) {
            throw new BodyParsingException("Параметр X должен был действительным числом");
        }

        if (validateDecimal(elements[1], 3)) {
            throw new BodyParsingException("Параметр Y должен был действительным числом с максимум тремя знаками после запятой");
        }
        try {
            y = Float.parseFloat(elements[1].replace(',', '.'));
        }
        catch (NumberFormatException e) {
            throw new BodyParsingException("Параметр Y должен был действительным числом");
        }

        if (validateDecimal(elements[2], 3)) {
            throw new BodyParsingException("Параметр R должен был действительным числом с максимум тремя знаками после запятой");
        }
        try {
            r = Float.parseFloat(elements[2].replace(',', '.'));
        }
        catch (NumberFormatException e) {
            throw new BodyParsingException("Параметр R должен был действительным числом");
        }

        if(!checkX(x)) {
            throw new BodyParsingException("Параметр X находится вне границ [-5; 3]");
        }

        if(!checkY(y)) {
            throw new BodyParsingException("Параметр Y находится вне границ [-5, 3]");
        }

        if(!checkR(r)) {
            throw new BodyParsingException("Параметр R находися вне границ [1, 4]");
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

    public static boolean validateDecimal(String value, int maxDecimals) {
        if (value == null || value.isEmpty()) {
            return false;
        }

        String normalizedValue = value.replace(',', '.');

        String regex = String.format("^-?\\d+(\\.\\d{1,%d})?$", maxDecimals);
        return Pattern.matches(regex, normalizedValue);
    }
}
