import './data.js'


var buttonXValue = "-5"

document.addEventListener('DOMContentLoaded', function() {
    const targetBtn = document.getElementById('-5');
    targetBtn.style.backgroundColor = "#0e700c";
    targetBtn.style.color = "white";
});

const buttonContainer = document.querySelector('.buttontable');
buttonContainer.addEventListener('click', function(event) {
    if (event.target.type === 'button') {
        document.querySelectorAll('.buttontable input[type="button"]').forEach(btn => {
            btn.style.backgroundColor = '';
            btn.style.color = '';
        });
        
        event.target.style.backgroundColor = "#0e700c";
        event.target.style.color = "white";
        buttonXValue = event.target.value;
    }
});


document.getElementById("submit-data").addEventListener("click", function(event) {
    event.preventDefault();
    let coords = getCoords();

    if(!coords) {
        return;
    }

    fetch(`http://localhost:8080/fcgi-bin/server.jar`, {
            method: 'POST',
            body: `${coords.x}, ${coords.y}, ${coords.r}`,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }
                return response.text();
            })
            .then(function (answer) {
                alert(answer)    
            })

});

function getCoords() {
    let yInput = document.getElementById("yinput").value;
    let rInput = document.getElementById("rinput").value;
    let logContainer = document.getElementById("logContainer");

    if(!checkForNull(buttonXValue, yInput, rInput)) {
        logContainer.textContent  = "Не все поля заполнены";
        return false;
    }
    
    let xInfo = checkX(buttonXValue);

    if (!xInfo.success) {
        updateLogText(xInfo.message);
        return false;
    }

    let yInfo = checkY(yInput);

    if (!yInfo.success) {
        updateLogText(yInfo.message);
        return false;
    }

    let rInfo = checkR(rInput);

    if (!rInfo.success) {
        updateLogText(rInfo.message);
        return false;
    }

    return {
        x: xInfo.value,
        y: yInfo.value,
        r: rInfo.value,
    };
}

function updateLogText(text) {
    logContainer.textContent  = text;
}











