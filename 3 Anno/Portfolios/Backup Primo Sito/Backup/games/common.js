// Aggiungi suoni
const sounds = {
    click: new Audio('data:audio/wav;base64,UklGRpwAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXgAAAAoAGYA/wD/AJr/mcyZ/wAAmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),
    gameOver: new Audio('data:audio/wav;base64,UklGRpwAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXgAAACAAGYA/wD/AJr/mcyZ/wAAmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),
    move: new Audio('data:audio/wav;base64,UklGRpwAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXgAAAAUAGYA/wD/AJr/mcyZ/wAAmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
};

// Stato globale del tema
let currentTheme = localStorage.getItem('gameTheme') || 'light';

function addEndGameButton() {
    // Controlla se il gioco usa fullscreen
    const isFullscreenGame = document.title.toLowerCase().includes('snake') || 
                            document.title.toLowerCase().includes('tetris') ||
                            document.title.toLowerCase().includes('pong');
    
    // Non aggiungere il pulsante per i giochi fullscreen
    if (isFullscreenGame) {
        return;
    }

    const gameContainer = document.getElementById('gameContainer');
    const endButton = document.createElement('button');
    endButton.className = 'end-game-button';
    endButton.textContent = 'Termina Gioco';
    
    endButton.addEventListener('click', () => {
        sounds.click.play();
        endButton.classList.add('button-click');
        setTimeout(() => {
            endButton.classList.remove('button-click');
            resetGame();
        }, 200);
    });
    
    gameContainer.appendChild(endButton);
    return endButton;
}

function resetGame() {
    const gameContainer = document.getElementById('gameContainer');
    const startButton = document.getElementById('startButton');
    const endButton = document.querySelector('.end-game-button');
    const canvas = document.querySelector('canvas');
    const score = document.getElementById('score');
    const instructions = document.getElementById('instructions');
    const board = document.getElementById('board');
    const keyboard = document.getElementById('keyboard');

    // Riproduci suono di game over
    sounds.gameOver.play();

    // Aggiungi effetto visivo
    gameContainer.classList.add('game-reset');

    // Reset degli elementi UI
    if (startButton) startButton.style.display = 'block';
    if (endButton) endButton.style.display = 'none';
    if (canvas) canvas.style.display = 'none';
    if (score) score.style.display = 'none';
    if (instructions) instructions.style.display = 'none';
    if (board) board.style.display = 'none';
    if (keyboard) keyboard.style.display = 'none';

    // Reset delle dimensioni
    if (canvas) {
        canvas.style.width = '';
        canvas.style.height = '';
    }

    setTimeout(() => {
        gameContainer.classList.remove('game-reset');
        window.location.reload();
    }, 300);
}

function handleExitFullscreen() {
    if (!document.fullscreenElement) {
        resetGame();
    }
}

function startGame() {
    const isFullscreenGame = document.title.toLowerCase().includes('snake') || 
                            document.title.toLowerCase().includes('tetris') ||
                            document.title.toLowerCase().includes('pong');
    
    sounds.click.play();

    if (isFullscreenGame) {
        startGameFullscreen();
    } else {
        // Per giochi non-fullscreen (es. Wordle)
        const startButton = document.getElementById('startButton');
        const endButton = document.querySelector('.end-game-button');
        if (startButton) startButton.style.display = 'none';
        if (endButton) endButton.style.display = 'block';
        // Avvia il gioco normalmente
    }
}

function startGameFullscreen() {
    const gameContainer = document.getElementById('gameContainer');
    const startButton = document.getElementById('startButton');
    
    sounds.click.play();

    // Nascondi il pulsante di avvio
    if (startButton) {
        startButton.style.display = 'none';
    }

    // Avvia fullscreen
    if (gameContainer.requestFullscreen) {
        gameContainer.requestFullscreen();
    } else if (gameContainer.mozRequestFullScreen) {
        gameContainer.mozRequestFullScreen();
    } else if (gameContainer.webkitRequestFullscreen) {
        gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) {
        gameContainer.msRequestFullscreen();
    }
}

// Funzione per rilevare se il dispositivo è mobile
function isMobileDevice() {
    return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 2)
    );
}

function addTouchControls() {
    // Aggiungi controlli touch solo se è un dispositivo mobile
    if (!isMobileDevice()) {
        return;
    }

    const gameContainer = document.getElementById('gameContainer');
    const touchControls = document.createElement('div');
    touchControls.className = 'touch-controls';

    const buttons = [
        { id: 'left', text: '←', key: 'a' },
        { id: 'right', text: '→', key: 'd' },
        { id: 'up', text: '↑', key: 'w' },
        { id: 'down', text: '↓', key: 's' }
    ];

    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.className = 'touch-button';
        button.id = `touch-${btn.id}`;
        button.textContent = btn.text;

        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const keyEvent = new KeyboardEvent('keydown', { key: btn.key });
            document.dispatchEvent(keyEvent);
            sounds.click.play();
            button.style.transform = 'scale(0.95)';
        });

        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            const keyEvent = new KeyboardEvent('keyup', { key: btn.key });
            document.dispatchEvent(keyEvent);
            button.style.transform = 'scale(1)';
        });

        touchControls.appendChild(button);
    });

    gameContainer.appendChild(touchControls);
}

// Aggiorna Snake per il touch
function updateSnakeForTouch() {
    const snake = document.querySelector('canvas');
    if (snake) {
        snake.style.touchAction = 'none';
        addTouchControls();
    }
}

// Aggiorna Tetris per il touch
function updateTetrisForTouch() {
    const tetris = document.querySelector('canvas');
    if (tetris) {
        tetris.style.touchAction = 'none';
        addTouchControls();
    }
}

function addPongTouchControls() {
    if (!isMobileDevice()) {
        return;
    }

    const gameContainer = document.getElementById('gameContainer');
    
    // Crea due aree touch invisibili per i due giocatori
    const leftTouchArea = document.createElement('div');
    const rightTouchArea = document.createElement('div');

    leftTouchArea.className = 'pong-touch-area left-area';
    rightTouchArea.className = 'pong-touch-area right-area';

    gameContainer.appendChild(leftTouchArea);
    gameContainer.appendChild(rightTouchArea);

    // Gestione touch per il giocatore 1 (sinistra)
    leftTouchArea.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = leftTouchArea.getBoundingClientRect();
        const relativeY = touch.clientY - rect.top;
        const percentY = relativeY / rect.height;

        if (percentY < 0.4) {
            // Muovi su
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));
        } else if (percentY > 0.6) {
            // Muovi giù
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 's' }));
        }
    });

    // Gestione touch per il giocatore 2 (destra)
    rightTouchArea.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = rightTouchArea.getBoundingClientRect();
        const relativeY = touch.clientY - rect.top;
        const percentY = relativeY / rect.height;

        if (percentY < 0.4) {
            // Muovi su
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'arrowup' }));
        } else if (percentY > 0.6) {
            // Muovi giù
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'arrowdown' }));
        }
    });

    // Reset dei controlli quando si rilascia il touch
    ['touchend', 'touchcancel'].forEach(event => {
        leftTouchArea.addEventListener(event, () => {
            document.dispatchEvent(new KeyboardEvent('keyup', { key: 'w' }));
            document.dispatchEvent(new KeyboardEvent('keyup', { key: 's' }));
        });

        rightTouchArea.addEventListener(event, () => {
            document.dispatchEvent(new KeyboardEvent('keyup', { key: 'arrowup' }));
            document.dispatchEvent(new KeyboardEvent('keyup', { key: 'arrowdown' }));
        });
    });
}

// Modifica la funzione di inizializzazione per includere i controlli di Pong
document.addEventListener('DOMContentLoaded', () => {
    const gameType = document.title.toLowerCase();
    
    // Aggiungi i controlli touch appropriati in base al tipo di gioco
    if (gameType.includes('snake')) {
        updateSnakeForTouch();
    } else if (gameType.includes('tetris')) {
        updateTetrisForTouch();
    } else if (gameType.includes('pong')) {
        addPongTouchControls();
    }

    // Aggiungi l'evento click al pulsante di avvio
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', startGameFullscreen);
    }

    // Previeni lo zoom su mobile
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    // Aggiungi gli effetti ai giochi
    addGameEffects();
});

// Gestione uscita fullscreen
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        resetGame();
    }
});

// Effetti grafici
function createParticles(x, y, color = '#fff', count = 10) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'game-effect';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.background = color;
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.position = 'absolute';
        particle.style.borderRadius = '50%';
        
        const angle = (Math.random() * Math.PI * 2);
        const velocity = Math.random() * 5 + 2;
        const lifetime = Math.random() * 500 + 500;
        
        document.body.appendChild(particle);
        
        let start = performance.now();
        
        function animate(now) {
            const elapsed = now - start;
            if (elapsed > lifetime) {
                particle.remove();
                return;
            }
            
            const progress = elapsed / lifetime;
            const moveX = x + Math.cos(angle) * velocity * elapsed * 0.1;
            const moveY = y + Math.sin(angle) * velocity * elapsed * 0.1 + (elapsed * 0.1)**2;
            const scale = 1 - progress;
            
            particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
            particle.style.opacity = 1 - progress;
            
            requestAnimationFrame(animate);
        }
        
        requestAnimationFrame(animate);
    }
}

// Effetto score popup
function showScorePopup(score, x, y) {
    const popup = document.createElement('div');
    popup.className = 'score-popup game-effect';
    popup.textContent = `+${score}`;
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    document.body.appendChild(popup);
    
    setTimeout(() => popup.remove(), 500);
}

// Aggiungi gli effetti ai giochi
function addGameEffects() {
    const gameType = document.title.toLowerCase();
    
    if (gameType.includes('snake')) {
        // Effetti per Snake
        document.addEventListener('point-scored', (e) => {
            createParticles(e.detail.x, e.detail.y, '#0f0');
            showScorePopup(10, e.detail.x, e.detail.y);
        });
    } else if (gameType.includes('tetris')) {
        // Effetti per Tetris
        document.addEventListener('line-cleared', (e) => {
            createParticles(e.detail.x, e.detail.y, '#fff', 20);
            showScorePopup(100, e.detail.x, e.detail.y);
        });
    } else if (gameType.includes('pong')) {
        // Effetti per Pong
        document.addEventListener('ball-hit', (e) => {
            createParticles(e.detail.x, e.detail.y, '#fff', 5);
        });
    }
}

// Funzione per creare il pulsante del tema
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.className = 'theme-toggle fullscreen-control';
    themeToggle.textContent = '🌙';
    return themeToggle;
}

// Funzione per creare i controlli fullscreen
function createFullscreenControls() {
    const controls = document.createElement('div');
    controls.className = 'fullscreen-controls';
    
    // Pulsante tema
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle fullscreen-control';
    themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    themeToggle.onclick = toggleTheme;
    
    // Pulsante audio
    const audioButton = document.createElement('button');
    audioButton.className = 'audio-button fullscreen-control';
    audioButton.textContent = '🔊';
    audioButton.onclick = toggleAudio;
    
    // Pulsante chiudi
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button fullscreen-control';
    closeButton.textContent = '✕';
    closeButton.onclick = () => document.exitFullscreen();
    
    controls.appendChild(themeToggle);
    controls.appendChild(audioButton);
    controls.appendChild(closeButton);
    
    return controls;
}

// Funzione per gestire il cambio tema
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme');
    
    // Aggiorna l'icona del pulsante
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }
    
    // Salva la preferenza
    localStorage.setItem('gameTheme', currentTheme);
    
    // Evento personalizzato per notificare il cambio tema
    const event = new CustomEvent('themeChanged', { detail: { theme: currentTheme } });
    document.dispatchEvent(event);
}

// Funzione per gestire l'audio
let isMuted = false;
function toggleAudio() {
    isMuted = !isMuted;
    const audioButton = document.querySelector('.audio-button');
    if (audioButton) {
        audioButton.textContent = isMuted ? '🔇' : '🔊';
    }
    
    // Evento personalizzato per notificare il cambio audio
    const event = new CustomEvent('audioChanged', { detail: { muted: isMuted } });
    document.dispatchEvent(event);
}

// Funzione per gestire il fullscreen
function handleFullscreen(gameContainer) {
    if (!document.fullscreenElement) {
        gameContainer.requestFullscreen().then(() => {
            // Rimuovi controlli esistenti se presenti
            const existingControls = gameContainer.querySelector('.fullscreen-controls');
            if (existingControls) {
                existingControls.remove();
            }
            
            // Aggiungi nuovi controlli
            const controls = createFullscreenControls();
            gameContainer.appendChild(controls);
            
            // Applica il tema corrente
            document.body.classList.toggle('dark-theme', currentTheme === 'dark');
        });
    }
}

// Gestione uscita fullscreen
document.addEventListener('fullscreenchange', () => {
    const controls = document.querySelector('.fullscreen-controls');
    if (!document.fullscreenElement && controls) {
        controls.remove();
    }
});

// Funzione per creare la preview di un gioco
function createGamePreview(gameId, title, description) {
    const preview = document.createElement('div');
    preview.className = 'game-preview';
    
    // Canvas per la preview
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    preview.appendChild(canvas);
    
    // Overlay con titolo e descrizione
    const overlay = document.createElement('div');
    overlay.className = 'game-preview-overlay';
    
    const titleEl = document.createElement('h3');
    titleEl.className = 'game-title';
    titleEl.textContent = title;
    
    const descEl = document.createElement('p');
    descEl.className = 'game-description';
    descEl.textContent = description;
    
    overlay.appendChild(titleEl);
    overlay.appendChild(descEl);
    preview.appendChild(overlay);
    
    // Gestione click
    preview.addEventListener('click', () => {
        window.location.href = `/games/${gameId}/${gameId}.html`;
    });
    
    return preview;
}

// Funzione per renderizzare la preview di Snake
function renderSnakePreview(canvas) {
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    
    // Sfondo verde a scacchi
    for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.fillStyle = (x + y) % (gridSize * 2) === 0 ? '#79C44D' : '#68B245';
            ctx.fillRect(x, y, gridSize, gridSize);
        }
    }
    
    // Serpente di esempio
    const snake = [
        {x: 7, y: 7},
        {x: 6, y: 7},
        {x: 5, y: 7},
        {x: 4, y: 7}
    ];
    
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#4A75E6' : '#4A75E6';
        ctx.beginPath();
        ctx.roundRect(
            segment.x * gridSize + 1,
            segment.y * gridSize + 1,
            gridSize - 2,
            gridSize - 2,
            8
        );
        ctx.fill();
    });
    
    // Mela
    ctx.fillStyle = '#FF5B49';
    ctx.beginPath();
    ctx.arc(
        9 * gridSize + gridSize/2,
        7 * gridSize + gridSize/2,
        gridSize/2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// Funzione per renderizzare la preview di Tetris
function renderTetrisPreview(canvas) {
    // ... codice esistente per la preview di Tetris ...
}

// Funzione per inizializzare tutte le preview
function initGamePreviews() {
    const gamesContainer = document.getElementById('gamesContainer');
    if (!gamesContainer) return;
    
    // Snake
    const snakePreview = createGamePreview(
        'snake',
        'Snake',
        'Il classico gioco del serpente in una versione moderna'
    );
    renderSnakePreview(snakePreview.querySelector('canvas'));
    gamesContainer.appendChild(snakePreview);
    
    // Tetris
    const tetrisPreview = createGamePreview(
        'tetris',
        'Tetris',
        'Il leggendario puzzle game dei blocchi che cadono'
    );
    renderTetrisPreview(tetrisPreview.querySelector('canvas'));
    gamesContainer.appendChild(tetrisPreview);
    
    // ... altri giochi ...
}

// Inizializza le preview quando il documento è pronto
document.addEventListener('DOMContentLoaded', () => {
    // Applica il tema salvato
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Inizializza le preview dei giochi
    initGamePreviews();
}); 