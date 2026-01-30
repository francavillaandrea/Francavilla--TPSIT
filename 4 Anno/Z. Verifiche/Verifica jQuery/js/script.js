"use strict"

const DIM = 8;
const GAME_TIME = 60;

let container = $("#gameContainer")
const scoreBox = $("#score");
const timerBox = $("#timer");
const restartBtn = $("#restartBtn");
const message = $("#message");
const nBombs = 5;

let points = 0;
let timeLeft = GAME_TIME;
let timerInterval = null;

init();

function init() {
    generateGrid();
    updateUI();
    startGame();

    restartBtn.on("click", restartGame);
}

function generateGrid() {
    container.empty();

    let id = 0;
    for (let r = 0; r < DIM; r++) {
        for (let c = 0; c < DIM; c++) {
            $("<div> <div/>")
                .addClass("cell")
                .attr("id", `cell${id++}`)
                .attr("bomba", `false`)
                .appendTo(container)
                .on("click", pressedCell)
                .css("text");
        }
    }
    for (let i = 0; i < nBombs; i++) {
        let nBomb = generaNumero(0, 64);
        let cellBomb = $(`#cell${nBomb}`).attr("bomba", `true`);
    }
}

function pressedCell() {
    if ($(this).attr("bomba").includes("true")) {
        $(this).text("👻")
        $(this).off("click");
        endGame()

    }
    else {
        $(this).text("🎅")
        $(this).off("click");


        if (points == 59) {
            endGame();
        }
        else {
            points++;
        }
    }
}

function startGame() {
    container.show()
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    updateUI();

    if (timeLeft <= 0) endGame();
}

function endGame() {
    clearInterval(timerInterval);
    if (points == 59) {
        message.text(`Hai vinto!\nPunteggio finale: ${points}`)
        container.hide(500);

    }
    message.text(`Tempo scaduto o bomba cliccata!\nPunteggio finale: ${points}`);
    let id = 0;
    for (let r = 0; r < DIM; r++) {
        for (let c = 0; c < DIM; c++) {
            if ($(`#cell${id++}`).attr("bomba") == true) {
                $(this).text("👻")

            }
        }
    }
    id = 0;
    for (let r = 0; r < DIM; r++) {
        for (let c = 0; c < DIM; c++) {
            $(`#cell${id}`)
                .off("click")
            id++;
        }
    }

}

function updateUI() {
    scoreBox.text(`Punteggio: ${points}`);
    timerBox.text(`Tempo rimasto: ${timeLeft}s`);
    message.text("")
}

function restartGame() {
    clearInterval(timerInterval);

    points = 0;
    timeLeft = GAME_TIME;

    generateGrid();
    updateUI();
    startGame();
}

function generaNumero(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}