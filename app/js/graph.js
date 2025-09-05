var canvas = document.getElementById("coordinateSystem")
const ctx = canvas.getContext('2d');
const R = 150; // радиус

ctx.translate(200,200); // центр в середину
ctx.fillStyle = "rgba(30,144,255,0.8)";
ctx.font = "15px cursive"


// 1. Прямоугольник сверху справа
ctx.fillRect(0,-R, R/2, R);
ctx.closePath();

// 2. Прямоугольный треугольник снизу справа
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(R/2,0);
ctx.lineTo(0,R/2);
ctx.closePath();
ctx.fill();

// 3. Четверть круга снизу слева
ctx.beginPath();
ctx.moveTo(0,0);
ctx.arc(0,0,R,-Math.PI,Math.PI/2,true);
ctx.closePath();
ctx.fill();

// Оси
ctx.strokeStyle="black";
ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
ctx.beginPath();
// Рисуем ось абсцисс
ctx.moveTo(-R-20,0);
ctx.lineTo(R+20,0);

// Рисуем -R
ctx.moveTo(-R,-4)
ctx.lineTo(-R, 4)
ctx.fillText("-R", -R  - 10, -5, 15)

// Рисуем -R / 2
ctx.moveTo(-R / 2,-4)
ctx.lineTo(-R / 2, 4)
ctx.fillText("-R/2", (-R / 2)  - 15, -5, 30)

// Рисуем R
ctx.moveTo(R,-4)
ctx.lineTo(R, 4)
ctx.fillText("R", R - 5, -5, 15)

// Рисуем R / 2
ctx.moveTo(R / 2,-4)
ctx.lineTo(R / 2, 4)
ctx.fillText("R/2", (R / 2)  - 10, -5, 30)

// Рисуем стрелочку и подписываем
ctx.moveTo(R+20, 0);
ctx.lineTo(R+10, 5);

ctx.moveTo(R+20, 0);
ctx.lineTo(R+10, -5);
ctx.fillText("x", R+21, 3, 30)


// Рисуем ось ординат
ctx.moveTo(0,-R-20);
ctx.lineTo(0,R+20);

// Рисуем -R
ctx.moveTo(-4, R)
ctx.lineTo(4, R)
ctx.fillText("-R", 5, R + 3, 15)

// Рисуем R / 2
ctx.moveTo(-4, R / 2)
ctx.lineTo(4, R / 2)
ctx.fillText("-R / 2", 5, (R /2) + 3, 40)

// Рисуем R
ctx.moveTo(-4, -R)
ctx.lineTo(4, -R)
ctx.fillText("R", 5, -R + 3, 15)

// Рисуем R / 2
ctx.moveTo(-4, -R / 2)
ctx.lineTo(4, -R / 2)
ctx.fillText("R / 2", 5, (-R /2) + 3, 40)

// Рисуем стрелочку и подписываем
ctx.moveTo(0,-R-20);
ctx.lineTo(-5,-R-10);

ctx.moveTo(0,-R-20);
ctx.lineTo(5,-R-10);
ctx.fillText("y", 3, -R - 20, 30)

ctx.stroke();