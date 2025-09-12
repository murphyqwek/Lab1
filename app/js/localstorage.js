$(document).ready(function() {
    loadFromLocalStorage();
});

function loadFromLocalStorage() {
    const storedData = JSON.parse(localStorage.getItem('resultData') || '[]');
    
    $("#resulttable").empty();

    $("#resulttable").append(
        `<tr>
            <td>X</td>
            <td>Y</td>
            <td>R</td>
            <td>Результат</td>
            <td>Время работы скрипты, нс</td>
            <td>Текущее время</td>
        </tr>`);
    
    storedData.forEach(data => {
        $("#resulttable").append(
            `<tr>
                <td>${data.x}</td>
                <td>${data.y}</td>
                <td>${data.r}</td>
                <td>${data.result}</td>
                <td>${data.time}</td>
                <td>${data.current_time}</td>
            </tr>`
        );
    });
    
    return storedData;
}