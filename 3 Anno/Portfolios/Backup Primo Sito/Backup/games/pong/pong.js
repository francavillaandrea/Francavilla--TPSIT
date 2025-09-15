const startButton = document.getElementById('startButton');
const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const instructions = document.getElementById('instructions');
let gameStarted = false;
let animationId;

// Game objects
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 7,
    velocityX: 5,
    velocityY: 5,
    color: 'white'
};

const paddleHeight = 100;
const paddleWidth = 10;

const leftPaddle = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: 'white',
    score: 0,
    speed: 8
};

const rightPaddle = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: 'white',
    score: 0,
    speed: 8
};

// Keyboard controls
const keys = {
    w: false,
    s: false,
    arrowup: false,
    arrowdown: false
};

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key in keys) {
        e.preventDefault(); // Previeni lo scroll
        keys[key] = true;
    }
});

document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key in keys) {
        keys[key] = false;
    }
});

function movePaddles() {
    // Giocatore 1 (WASD)
    if (keys.w && leftPaddle.y > 0) {
        leftPaddle.y -= leftPaddle.speed;
    }
    if (keys.s && leftPaddle.y < canvas.height - leftPaddle.height) {
        leftPaddle.y += leftPaddle.speed;
    }

    // Giocatore 2 (Frecce)
    if (keys.arrowup && rightPaddle.y > 0) {
        rightPaddle.y -= rightPaddle.speed;
    }
    if (keys.arrowdown && rightPaddle.y < canvas.height - rightPaddle.height) {
        rightPaddle.y += rightPaddle.speed;
    }
}

function collision(b, p) {
    return b.x + b.radius > p.x && 
           b.x - b.radius < p.x + p.width && 
           b.y + b.radius > p.y && 
           b.y - b.radius < p.y + p.height;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

function updateScore() {
    scoreDisplay.textContent = `${leftPaddle.score} - ${rightPaddle.score}`;
}

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawNet() {
    for(let i = 0; i <= canvas.height; i += 15) {
        drawRect(canvas.width/2 - 1, i, 2, 10, 'white');
    }
}

function update() {
    if (!gameStarted) return;

    // Move the ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Ball collision with top and bottom walls
    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    // Determine which paddle is being hit
    let player = ball.x < canvas.width/2 ? leftPaddle : rightPaddle;

    if(collision(ball, player)) {
        let collidePoint = ball.y - (player.y + player.height/2);
        collidePoint = collidePoint/(player.height/2);
        
        let angleRad = collidePoint * Math.PI/4;
        let direction = ball.x < canvas.width/2 ? 1 : -1;
        
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        
        ball.speed += 0.5;
    }

    // Points
    if(ball.x - ball.radius < 0) {
        rightPaddle.score++;
        updateScore();
        resetBall();
    } else if(ball.x + ball.radius > canvas.width) {
        leftPaddle.score++;
        updateScore();
        resetBall();
    }

    movePaddles();
}

function render() {
    // Clear canvas
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    
    // Draw net
    drawNet();
    
    // Draw paddles
    drawRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, leftPaddle.color);
    drawRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, rightPaddle.color);
    
    // Draw ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function gameLoop() {
    update();
    render();
    animationId = requestAnimationFrame(gameLoop);
}

// Aggiungi questo codice per il focus automatico
window.addEventListener('load', () => {
    canvas.focus();
});

startButton.addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        startButton.style.display = 'none';
        canvas.style.display = 'block';
        scoreDisplay.style.display = 'block';
        instructions.style.display = 'block';
        canvas.focus(); // Aggiungi il focus quando il gioco inizia
        gameLoop();
    }
});

function resizeCanvas() {
    const container = canvas.parentElement;
    const width = Math.min(container.clientWidth * 0.9, 800);
    const height = width / 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
}

window.addEventListener('resize', resizeCanvas);