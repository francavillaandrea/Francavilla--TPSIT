const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');

// Imposta le dimensioni del canvas
canvas.width = 600;
canvas.height = 600;

// Configurazione del gioco
const config = {
    gridSize: 20,
    speed: 150,
    initialLength: 4,
    colors: {
        background: '#68B245',        // Verde chiaro per lo sfondo
        grass1: '#79C44D',           // Verde più chiaro per il pattern
        grass2: '#68B245',           // Verde base per il pattern
        snake: '#4A75E6',            // Blu per il serpente
        food: '#FF5B49',             // Rosso-arancio per la mela
        border: '#557B3E'            // Verde scuro per i bordi
    }
};

// Aggiungi configurazioni per il prato
const fieldConfig = {
    grassColor1: '#2ecc71',
    grassColor2: '#27ae60',
    gridSize: 40
};

// Stato del gioco
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let score = 0;
let gameLoop;
let isGameOver = false;
let isGameStarted = false;

// Configurazione temi
const themes = {
    light: {
        background: '#68B245',
        grass1: '#79C44D',
        grass2: '#68B245',
        snake: '#4A75E6',
        food: '#FF5B49',
        border: '#557B3E'
    },
    dark: {
        background: '#1a1a2e',
        grass1: '#2a2a4e',
        grass2: '#1a1a2e',
        snake: '#4A75E6',
        food: '#FF5B49',
        border: '#333366'
    }
};

let currentTheme = 'light';

// Inizializza il canvas
function initCanvas() {
    // Imposta le dimensioni del canvas per riempire lo schermo
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Ricalcola la dimensione della griglia in base alle nuove dimensioni
    config.gridSize = Math.min(
        Math.floor(canvas.width / 30),
        Math.floor(canvas.height / 30)
    );
}

// Funzione chiamata da common.js quando si clicca "Gioca"
window.startGameCallback = function() {
    if (!isGameOver) {
        startGame();
    }
};

function startGame() {
    // Mostra l'alert
    alert('Gioco ancora in sviluppo');
    return; // Interrompe l'esecuzione della funzione qui
    
    // Il codice sotto non verrà eseguito
    const gameContainer = document.getElementById('gameContainer');
    handleFullscreen(gameContainer);
    startButton.style.display = 'none';
    
    // Inizializza il serpente al centro
    const centerX = Math.floor((canvas.width / config.gridSize) / 2);
    const centerY = Math.floor((canvas.height / config.gridSize) / 2);
    
    snake = [];
    for (let i = 0; i < config.initialLength; i++) {
        snake.push({ x: centerX - i, y: centerY });
    }
    
    // Reset variabili
    direction = 'right';
    nextDirection = 'right';
    score = 0;
    isGameOver = false;
    isGameStarted = true;
    
    // Genera il primo cibo
    generateFood();
    
    // Avvia il game loop
    if (gameLoop) cancelAnimationFrame(gameLoop);
    gameLoop = requestAnimationFrame(gameLoop);
}

function generateFood() {
    const gridWidth = Math.floor(canvas.width / config.gridSize);
    const gridHeight = Math.floor(canvas.height / config.gridSize);
    
    do {
        food = {
            x: Math.floor(Math.random() * gridWidth),
            y: Math.floor(Math.random() * gridHeight)
        };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
}

function update() {
    if (!isGameStarted || isGameOver) return;

    const head = { ...snake[0] };
    switch (direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }

    // Controllo collisioni con i bordi
    if (head.x < 0 || head.x >= canvas.width / config.gridSize ||
        head.y < 0 || head.y >= canvas.height / config.gridSize) {
        gameOver();
        return;
    }

    // Controllo collisioni con il serpente
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        generateFood();
    } else {
        snake.pop();
    }
}

function drawGrassPattern() {
    const tileSize = 40;
    for (let x = 0; x < canvas.width; x += tileSize) {
        for (let y = 0; y < canvas.height; y += tileSize) {
            ctx.fillStyle = (x + y) % (tileSize * 2) === 0 ? 
                config.colors.grass1 : 
                config.colors.grass2;
            ctx.fillRect(x, y, tileSize, tileSize);
        }
    }
}

function drawSnake() {
    snake.forEach((segment, index) => {
        const x = segment.x * config.gridSize;
        const y = segment.y * config.gridSize;
        
        if (index === 0) {
            // Testa del serpente
            ctx.fillStyle = config.colors.snake;
            ctx.beginPath();
            ctx.roundRect(x, y, config.gridSize - 2, config.gridSize - 2, 8);
            ctx.fill();
            
            // Occhi
            const eyeSize = 4;
            ctx.fillStyle = 'white';
            
            // Posizione degli occhi in base alla direzione
            let eyePositions;
            switch(direction) {
                case 'right':
                    eyePositions = [[x + config.gridSize - 8, y + 5], [x + config.gridSize - 8, y + config.gridSize - 9]];
                    break;
                case 'left':
                    eyePositions = [[x + 4, y + 5], [x + 4, y + config.gridSize - 9]];
                    break;
                case 'up':
                    eyePositions = [[x + 5, y + 4], [x + config.gridSize - 9, y + 4]];
                    break;
                case 'down':
                    eyePositions = [[x + 5, y + config.gridSize - 8], [x + config.gridSize - 9, y + config.gridSize - 8]];
                    break;
            }
            
            eyePositions.forEach(([ex, ey]) => {
                ctx.beginPath();
                ctx.arc(ex, ey, eyeSize, 0, Math.PI * 2);
                ctx.fill();
            });
        } else {
            // Corpo del serpente
            ctx.fillStyle = config.colors.snake;
            ctx.beginPath();
            ctx.roundRect(x, y, config.gridSize - 2, config.gridSize - 2, 8);
            ctx.fill();
        }
    });
}

function drawFood() {
    const x = food.x * config.gridSize;
    const y = food.y * config.gridSize;
    
    // Mela
    ctx.fillStyle = config.colors.food;
    ctx.beginPath();
    ctx.arc(
        x + config.gridSize/2,
        y + config.gridSize/2,
        config.gridSize/2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // Picciolo
    ctx.fillStyle = '#2D3319';
    ctx.fillRect(
        x + config.gridSize/2 - 2,
        y + 2,
        4,
        6
    );
}

function draw() {
    // Disegna lo sfondo
    drawGrassPattern();

    // Disegna il serpente
    drawSnake();

    // Disegna il cibo
    drawFood();

    // Bordo verde scuro
    ctx.strokeStyle = config.colors.border;
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Punteggio
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`🍎 ${score}`, 20, 40);
}

function gameLoop() {
    update();
    draw();
    
    if (!isGameOver) {
        setTimeout(() => {
            requestAnimationFrame(gameLoop);
        }, config.speed);
    }
}

function gameOver() {
    isGameOver = true;
    isGameStarted = false;
    startButton.style.display = 'block';
    startButton.textContent = 'Rigioca';
}

// Event Listeners
document.addEventListener('keydown', (e) => {
    if (!isGameStarted) {
        if (e.key === ' ') startGame();
        return;
    }
    
    switch(e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
            if (direction !== 'down') nextDirection = 'up';
            break;
        case 's':
        case 'arrowdown':
            if (direction !== 'up') nextDirection = 'down';
            break;
        case 'a':
        case 'arrowleft':
            if (direction !== 'right') nextDirection = 'left';
            break;
        case 'd':
        case 'arrowright':
            if (direction !== 'left') nextDirection = 'right';
            break;
    }
});

// Aggiungi event listener per il ridimensionamento
window.addEventListener('resize', () => {
    if (document.fullscreenElement) {
        initCanvas();
    }
});

// Gestione uscita fullscreen
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        gameOver();
    }
});

// Funzione per cambiare tema
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme');
    config.colors = themes[currentTheme];
    
    // Aggiorna l'icona del pulsante
    const themeToggle = document.querySelector('#themeToggle');
    if (themeToggle) {
        themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }
    
    // Salva il tema
    localStorage.setItem('snakeTheme', currentTheme);
    
    // Ridisegna il gioco
    if (isGameStarted) {
        draw();
    } else {
        drawGrassPattern();
    }
}

// Inizializzazione
window.onload = () => {
    initCanvas();
    canvas.style.display = 'block';

    // Inizializza il pulsante del tema
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Controlla se c'è un tema salvato
    const savedTheme = localStorage.getItem('snakeTheme');
    if (savedTheme) {
        currentTheme = savedTheme;
        config.colors = themes[currentTheme];
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.textContent = '☀️';
        }
    }
    
    // Disegna lo sfondo iniziale
    drawGrassPattern();
    
    // Aggiungi event listener al pulsante di avvio
    startButton.addEventListener('click', startGame);
};

// Salva il tema quando viene cambiato
function saveTheme() {
    localStorage.setItem('snakeTheme', currentTheme);
} 