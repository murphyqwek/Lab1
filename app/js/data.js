var x = 0;
var y = 0;
var r = 0;

function getCurrentX(clicked_id)
{
    x = parseInt(clicked_id);
    alert(x);
}

function updateY() {
    let newX = document.getElementById("yinput").textContent;
    alert(newX)
}