function checkForNull(x, y, r) {
    if (x &&  y && r) {
        return true;
    }

    return false
}


function checkX(x) {
    let temp = x.trim();
    let newX = parseInt(x);

    if (isNaN(newX) || temp !== newX.toString()) {
        return {
            success: false,
            message: "X должен содержать корректное число",
            value: NaN,
        }
    }

    return {
            success: true,
            message: "Успешно",
            value: newX,
        }
}

function checkY(y) {
    let temp = y.trim();
    let newY = parseFloat(y);

    if (isNaN(newY) || temp !== newY.toString()) {
        return {
            success: false,
            message: "Y должен содержать корректное число",
            value: NaN,
        }
    }

    if (newY < -5 || newY > 3) {
        return {
            success: false,
            message: "Y должен быть в промежутке от -5 до 3",
            value: NaN,
        }
    }

    return {
            success: true,
            message: "Успешно",
            value: newY,
    }
}

function checkR(r) {
    let temp = r.trim();
    let newR = parseFloat(r);

    if (isNaN(newR) || temp !== newR.toString()) {
        return {
            success: false,
            message: "R должен содержать корректное число",
            value: NaN,
        }
    }

    if (newR < 1 || newR > 4) {
        return {
            success: true,
            message: "R должен быть в промежутке от 1 до 4",
            value: NaN,
        }
    }

    return {
            success: true,
            message: "Успешно",
            value: newR,
    }
}