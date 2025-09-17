const WORDS = ['CANTO', 'PESTO', 'LIBRO', 'PASTA', 'PIZZA', 'GIOCO', 'VERDE', 'ROSSO', 'NOTTE', 'GATTO'];
const WORD_LENGTH = 5;
const TRIES = 6;

let currentWord = '';
let currentRow = 0;
let currentTile = 0;
let gameOver = false;
let gameStarted = false;

const board = document.getElementById('board');
const keyboard = document.getElementById('keyboard');
const message = document.getElementById('message');
const startButton = document.getElementById('startButton');

function initializeGame() {
    // Crea la griglia
    for (let i = 0; i < TRIES; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        
        for (let j = 0; j < WORD_LENGTH; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            row.appendChild(tile);
        }
        
        board.appendChild(row);
    }

    // Crea la tastiera
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
    ];

    keys.forEach(row => {
        const keyboardRow = document.createElement('div');
        keyboardRow.className = 'keyboard-row';
        
        row.forEach(key => {
            const buttonElement = document.createElement('button');
            buttonElement.textContent = key;
            buttonElement.className = 'key';
            buttonElement.addEventListener('click', () => handleKeyPress(key));
            keyboardRow.appendChild(buttonElement);
        });
        
        keyboard.appendChild(keyboardRow);
    });
}

function startGame() {
    gameStarted = true;
    gameOver = false;
    currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    startButton.style.display = 'none';
    board.style.display = 'grid';
    keyboard.style.display = 'grid';
    message.textContent = '';
}

function handleKeyPress(key) {
    if (!gameStarted || gameOver) return;

    if (key === '⌫') {
        deleteLetter();
    } else if (key === 'ENTER') {
        checkWord();
    } else if (currentTile < WORD_LENGTH && currentRow < TRIES) {
        addLetter(key);
    }
}

function addLetter(letter) {
    const tile = board.children[currentRow].children[currentTile];
    tile.textContent = letter;
    tile.classList.add('pop');
    currentTile++;
}

function deleteLetter() {
    if (currentTile > 0) {
        currentTile--;
        const tile = board.children[currentRow].children[currentTile];
        tile.textContent = '';
        tile.classList.remove('pop');
    }
}

function checkWord() {
    if (currentTile !== WORD_LENGTH) {
        showMessage('Parola troppo corta!');
        return;
    }

    const guess = Array.from(board.children[currentRow].children)
        .map(tile => tile.textContent)
        .join('');

    const tiles = board.children[currentRow].children;
    const keyElements = keyboard.getElementsByClassName('key');

    // Controlla ogni lettera
    for (let i = 0; i < WORD_LENGTH; i++) {
        const tile = tiles[i];
        const letter = guess[i];
        const keyEl = Array.from(keyElements).find(key => key.textContent === letter);

        setTimeout(() => {
            tile.classList.add('flip');
            
            if (letter === currentWord[i]) {
                tile.classList.add('correct');
                keyEl.classList.add('correct');
            } else if (currentWord.includes(letter)) {
                tile.classList.add('present');
                keyEl.classList.add('present');
            } else {
                tile.classList.add('absent');
                keyEl.classList.add('absent');
            }
        }, i * 100);
    }

    if (guess === currentWord) {
        setTimeout(() => {
            showMessage('Hai vinto! 🎉');
            gameOver = true;
        }, WORD_LENGTH * 100);
    } else if (currentRow === TRIES - 1) {
        setTimeout(() => {
            showMessage(`Hai perso! La parola era ${currentWord}`);
            gameOver = true;
        }, WORD_LENGTH * 100);
    }

    currentRow++;
    currentTile = 0;
}

function showMessage(msg) {
    message.textContent = msg;
    setTimeout(() => {
        message.textContent = '';
    }, 3000);
}

document.addEventListener('keydown', (e) => {
    if (!gameStarted || gameOver) return;

    const key = e.key.toUpperCase();
    if (key === 'BACKSPACE') {
        handleKeyPress('⌫');
    } else if (key === 'ENTER') {
        handleKeyPress('ENTER');
    } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
    }
});

startButton.addEventListener('click', () => {
    startGameFullscreen();
    startGame();
});

function pauseGame() {
    gameStarted = false;
    startButton.style.display = 'block';
    board.style.display = 'none';
    keyboard.style.display = 'none';
}

document.addEventListener('fullscreenchange', () => {
    handleExitFullscreen(pauseGame);
});

initializeGame();
board.style.display = 'none';
keyboard.style.display = 'none'; 