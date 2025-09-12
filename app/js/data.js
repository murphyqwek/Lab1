function checkForNull(x, y, r) {
    if (x &&  y && r) {
        return true;
    }

    return false
}

function validateDecimal(value, maxDecimals = 3) {
    let normalizedValue = value.replace(',', '.');
    let regex = new RegExp(`^-?\\d+(\\.\\d{1,${maxDecimals}})?$`);
    return regex.test(normalizedValue);
}


function checkX(x) {
    let temp = x.trim();
    let newX = parseInt(x);

    
    if(!validateDecimal(temp)) {
        return {
            success: false,
            message: "X должен быть от -5 до 3 и должно быть максимум 3 знака после запятой",
            value: NaN,
        }
    }

    if (isNaN(newX) || temp !== newX.toString()) {
        return {
            success: false,
            message: "X должен быть от -5 до 3 и должно быть максимум 3 знака после запятой",
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

    
    if(!validateDecimal(temp)) {
        return {
            success: false,
            message: "Y должен быть от -5 до 3 и должно быть максимум 3 знака после запятой",
            value: NaN,
        }
    }

    if (isNaN(newY) || temp !== newY.toString()) {
        return {
            success: false,
            message: "Y должен быть от -5 до 3 и должно максимум 3 знака после запятой",
            value: NaN,
        }
    }

    if (newY < -5 || newY > 3) {
        return {
            success: false,
            message: "Y должен быть от -5 до 3 и должно максимум 3 знака после запятой",
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

    if(!validateDecimal(temp)) {
        return {
            success: false,
            message: "R должен быть от 1 до 4 и должно быть максимум 3 знака после запятой",
            value: NaN,
        }
    }

    if (isNaN(newR) || temp !== newR.toString()) {
        return {
            success: false,
            message: "R должен быть от 1 до 4 и должно быть максимум 3 знака после запятой",
            value: NaN,
        }
    }

    if (newR < 1 || newR > 4) {
        return {
            success: true,
            message: "R должен быть от 1 до 4 и должно быть максимум 3 знака после запятой",
            value: NaN,
        }
    }

    return {
            success: true,
            message: "Успешно",
            value: newR,
    }
}