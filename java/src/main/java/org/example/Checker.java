package org.example;


public class Checker {
    public static boolean isHit(RequestData data) {
        return checkSemicirle(data) || checkRectangle(data) || checkTriangle(data);
    }

    private static boolean checkSemicirle(RequestData data) {
        float x = data.x(), y = data.y(), r = data.r();

        return x * x + y * y <= r * r && x <= 0 && y <= 0;
    }

    private static boolean checkRectangle(RequestData data) {
        float x = data.x(), y = data.y(), r = data.r();

        return (x <= r / 2 && x >= 0) && (y <= r && y >= 0);
    }

    private static boolean checkTriangle(RequestData data) {
        float x = data.x(), y = data.y(), r = data.r();
        float ax = 0, ay = 0;
        float bx = r/2, by = 0;
        float cx = 0, cy = -r/2;

        float v1 = crossProduct(ax, ay, bx, by, x, y);
        float v2 = crossProduct(bx, by, cx, cy, x, y);
        float v3 = crossProduct(cx, cy, ax, ay, x, y);

        return (v1 >= 0 && v2 >= 0 && v3 >= 0) || (v1 <= 0 && v2 <= 0 && v3 <= 0);
    }

    private static float crossProduct(float ax, float ay,
                                      float bx, float by,
                                      float cx, float cy) {
        return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
    }
}
