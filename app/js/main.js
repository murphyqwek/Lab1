import './data.js'

var buttonXValue = "-5"

document.addEventListener('DOMContentLoaded', function() {
    const targetBtn = document.getElementById('-5');
    targetBtn.style.backgroundColor = "#0e700c";
    targetBtn.style.color = "white";
});

const buttonContainer = document.querySelector('.buttontable');
buttonContainer.addEventListener('click', function(event) {
    if (event.target.id === 'submit-data') {
        return;
    }
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

    $("#logContainer").text("")
    $.post("http://localhost:8080/fcgi-bin/server.jar", `${coords.x},${coords.y},${coords.r}`).done(function(data) {
        if(data.error_message === "") {
            $("#resulttable").append(`<tr><td>${data.x}</td> <td>${data.y}</td> <td>${data.r}</td> <td>${data.result}</td> <td>${data.time}</td></tr>`);
        }
        else {
            $("#logContainer").text(data.error_message)
        }
    }).fail(function() {
        $("#logContainer").text("Не удалось получить ответ от сервера")
    });
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











