//declare variables for html elements
let canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');

//declare game variables
let score = 0;
let brickRowCount = 9;
let brickColumnCount = 5;

//rules and close event handlers
rulesBtn.addEventListener("click", () => rules.classList.add("show"));

closeBtn.addEventListener("click", () => rules.classList.remove("show"));

//objects
//create ball object
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 2,
  speed: .5,
  dx: 2,
  dy: -2
}

//create paddle object
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 20,
  h: 2.5,
  speed: 8,
  dx: 0
}

//create brick object
const brickInfo = {
  w: 20,
  h: 5,
  padding: 5,
  offsetX: 35,
  offsetY: 25,
  visible: true
}

//canvas elements
//create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo }
  }
}

//draw bricks on canvas
const drawBricks = () => {
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    })
  })
}

//draw ball on canvas
const drawBall = (ball) => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

//draw paddle on canvas
const drawPaddle = (paddle) => {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillstyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

//draw score on canvas
const drawScore = () => {
  ctx.font = '10px Bungee Inline';
  ctx.fillText(`Score: ${score}`, canvas.width - 60, 20);
  if (score === 45) {
    ctx.fillText(`Score: ${score} (MAX)`, canvas.width - 50, 20)
  }
}

//animation
//put all drawings inside a draw function to continually re-draw them to the canvas(animate)
const draw = () => {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall(ball);
  drawPaddle(paddle);
  drawScore();
  drawBricks();
}

//move paddle on canvas
const movePaddle = () => {
  paddle.x += paddle.dx;

  //wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w
  }
  if (paddle.x < 0) {
    paddle.x = 0
  }
}

const moveBall = () => {
  ball.x += ball.dx;
  ball.y += ball.dy;

  //wall collision(right/left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; //ball.dx = ball.dx * -1
  }
  //wall collision(top/bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  //paddle collision
  if (ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y) {
    ball.dy = -ball.speed;
  }

  //brick collision
  bricks.forEach(column => {
    column.forEach(brick => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && //left brick side
          ball.x + ball.size < brick.x + brick.w && //right brick side
          ball.y + ball.size > brick.y && //top brick side
          ball.y - ball.size < brick.y + brick.h //bottom brick side
        )
      {
        ball.dy *= -1;
        brick.visible = false;

        increaseScore();
      }
      }
    })
    })

    //hit bottom wall(lose)
    if (ball.y + ball.size > canvas.height) {
      showAllBricks();
      score = 0;
    }
}

//increase score function
const increaseScore = () => {
  score++;

  if (score % (brickRowCount * brickRowCount) === 0) {
    showAllBricks();;
  }
}


//create a function to reset bricks after bottom wall is hit
const showAllBricks = () => {
  bricks.forEach(column => {
    column.forEach(brick => (brick.visible = true));
  })
}

//update canvas drawing and animation
const update = () => {
  movePaddle();
  moveBall();
  //draw everything
  draw();

  requestAnimationFrame(update);
}

update();

//keydown/keyup event functions
const keyDown = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}

const keyUp = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = 0;
  }
}

//keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);