const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('score');
const instructions = document.getElementById('instructions');
const grid = 32;
const tetrominoSequence = [];

let gameStarted = false;
let rAF = null;  // keep track of the animation frame
let gameOver = false;

// populate the empty state
const playfield = Array(20).fill().map(() => Array(10).fill(0));

// how to draw each tetromino
const tetrominos = {
    'I': [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]],
    'J': [[1,0,0], [1,1,1], [0,0,0]],
    'L': [[0,0,1], [1,1,1], [0,0,0]],
    'O': [[1,1], [1,1]],
    'S': [[0,1,1], [1,1,0], [0,0,0]],
    'T': [[0,1,0], [1,1,1], [0,0,0]],
    'Z': [[1,1,0], [0,1,1], [0,0,0]]
};

// color of each tetromino
const colors = {
    'I': 'cyan',
    'O': 'yellow',
    'T': 'purple',
    'S': 'green',
    'Z': 'red',
    'J': 'blue',
    'L': 'orange'
};

let count = 0;
let tetromino = getNextTetromino();
let score = 0;
let dropCounter = 0;
let dropInterval = 1000;

function getNextTetromino() {
    if (tetrominoSequence.length === 0) {
        tetrominoSequence.push(...['I', 'J', 'L', 'O', 'S', 'T', 'Z'].sort(() => Math.random() - 0.5));
    }

    const name = tetrominoSequence.pop();
    const matrix = tetrominos[name];

    // I and O start centered, all others start in left-middle
    const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

    // I starts on row 21 and all others start on row 22
    const row = name === 'I' ? -1 : -2;

    return {
        name: name,      // name of the piece (L, O, etc.)
        matrix: matrix,  // the current rotation matrix
        row: row,        // current row (starts offscreen)
        col: col         // current col
    };
}

function rotate(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) =>
        row.map((val, j) => matrix[N - j][i])
    );
    return result;
}

function isValidMove(matrix, cellRow, cellCol) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] && (
                cellCol + col < 0 ||
                cellCol + col >= playfield[0].length ||
                cellRow + row >= playfield.length ||
                playfield[cellRow + row][cellCol + col])
            ) {
                return false;
            }
        }
    }
    return true;
}

function placeTetromino() {
    for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
            if (tetromino.matrix[row][col]) {
                if (tetromino.row + row < 0) {
                    return showGameOver();
                }
                playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
            }
        }
    }

    // check for line clears starting from the bottom and working our way up
    for (let row = playfield.length - 1; row >= 0; ) {
        if (playfield[row].every(cell => !!cell)) {
            // drop every row above this one
            for (let r = row; r >= 0; r--) {
                playfield[r] = playfield[r-1];
            }
            score += 100;
            scoreDisplay.textContent = `Score: ${score}`;
        }
        else {
            row--;
        }
    }

    tetromino = getNextTetromino();
}

function loop() {
    if (!gameStarted || gameOver) return;

    rAF = requestAnimationFrame(loop);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw the playfield
    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
            if (playfield[row][col]) {
                const name = playfield[row][col];
                context.fillStyle = colors[name];
                context.fillRect(col * grid, row * grid, grid-1, grid-1);
            }
        }
    }

    // draw the active tetromino
    if (tetromino) {
        // tetromino falls every 35 frames
        if (++count > 35) {
            tetromino.row++;
            count = 0;

            // place piece if it runs into anything
            if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
                tetromino.row--;
                placeTetromino();
            }
        }

        context.fillStyle = colors[tetromino.name];

        for (let row = 0; row < tetromino.matrix.length; row++) {
            for (let col = 0; col < tetromino.matrix[row].length; col++) {
                if (tetromino.matrix[row][col]) {
                    context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid-1, grid-1);
                }
            }
        }
    }
}

function showGameOver() {
    cancelAnimationFrame(rAF);
    gameOver = true;

    context.fillStyle = 'black';
    context.globalAlpha = 0.75;
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);

    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '36px Montserrat';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
}

// listen to keyboard events to move the active tetromino
document.addEventListener('keydown', function(e) {
    if (!gameStarted || gameOver) return;

    const key = e.key.toLowerCase();

    // Previeni lo scroll della pagina
    if(['w', 'a', 's', 'd'].includes(key)) {
        e.preventDefault();
    }

    // a e d per muovere
    if (key === 'a' || key === 'd') {
        const col = key === 'a'
            ? tetromino.col - 1
            : tetromino.col + 1;

        if (isValidMove(tetromino.matrix, tetromino.row, col)) {
            tetromino.col = col;
        }
    }

    // w per ruotare
    if (key === 'w') {
        const matrix = rotate(tetromino.matrix);
        if (isValidMove(matrix, tetromino.row, tetromino.col)) {
            tetromino.matrix = matrix;
        }
    }

    // s per velocizzare la caduta
    if(key === 's') {
        const row = tetromino.row + 1;

        if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
            tetromino.row = row - 1;
            placeTetromino();
            return;
        }

        tetromino.row = row;
    }
});

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
        requestAnimationFrame(loop);
    }
});

function resizeCanvas() {
    const container = canvas.parentElement;
    const width = Math.min(container.clientWidth * 0.9, 320);
    const height = width * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
}

window.addEventListener('resize', resizeCanvas);