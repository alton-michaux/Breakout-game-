//declare variables for html elements
let canvas = document.getElementById('gameCanvas');

let score = 0;

const ctx = canvas.getContext("2d");

const rulesBtn = document.getElementById('rules-btn');

const closeBtn = document.getElementById('close-btn');

const rules = document.getElementById('rules');

//rules and close event handlers
rulesBtn.addEventListener("click", () => rules.classList.add("show"));

closeBtn.addEventListener("click", () => rules.classList.remove("show"));

//animation
//create ball properties
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 2,
  speed: 4,
  dx: 4,
  dy: -4
}

//create paddle properties
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height -20,
  w: 20,
  h: 5,
  speed: 8,
  dx: 0
}

//draw ball on canvas
const drawBall = (ball) => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle="#0095dd";
  ctx.fill();
  ctx.closePath();
}

//draw paddle on canvas
const drawPaddle = (paddle) => {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillstyle="#0095dd";
  ctx.fill();
  ctx.closePath();
}

//draw score on canvas
const drawScore = (canvas) => {
  ctx.font = "10px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 50, 20);
}

//put all drawings inside a draw function to continually draw them to the canvas(animate)
const draw = () => {
  drawBall(ball);
  drawPaddle(paddle);
  drawScore(canvas);
}

draw();