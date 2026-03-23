"use strict";
const _txtBanco = document.getElementById("txtBanco");
const _chkNum = document.getElementsByName("chkNum");
const _txtNum = document.getElementsByName("txtNum");
const _txtUser = document.getElementById("txtUser");
const _btnBanco = document.getElementById("btnBanco");

let nBanco = generaNumero(1, 11);
_txtBanco.value = nBanco;

let somma = 0;
let sommaBanco = nBanco;
let gameOver = false;


function visualizza(n) {
    if (gameOver) return;

    _chkNum[n].disabled = true;
    _txtNum[n].value = generaNumero(1, 11);
    somma += parseInt(_txtNum[n].value);
    _txtUser.value = somma;

    if (somma > 21) {
        alert("Hai perso! Hai superato 21");
        gameOver = true;
        finePartita();
    }
    else if (somma == 21) {
        alert("Blackjack! Hai vinto!");
        gameOver = true;
        finePartita();
    }
}

function banco() {
    if (gameOver) return;

    // Disabilitare i checkbox del giocatore
    for (let i = 0; i < _chkNum.length; i++) {
        _chkNum[i].disabled = true;
    }

    // Il banco continua a pescare carte finché non raggiunge 17
    sommaBanco += generaNumero(1, 11);
    _txtBanco.value = sommaBanco;

    // Se il banco supera 21, il giocatore vince
    if (sommaBanco > 21) {
        alert("Il banco ha superato 21! Il giocatore ha vinto!");
        gameOver = true;
        _btnBanco.disabled = true;
        finePartita();
        return;
    }

    // Se il banco raggiunge 17 o più, fermarsi e confrontare
    if (sommaBanco >= 17) {
        _btnBanco.disabled = true;
        confrontaRisultati();
    }
}

function confrontaRisultati() {
    const userScore = parseInt(_txtUser.value);
    const bancoScore = parseInt(_txtBanco.value);

    if (userScore > 21) {
        alert("Il giocatore ha superato 21! Ha vinto il Banco!");
    }
    else if (bancoScore > 21) {
        alert("Il Banco ha superato 21! Il giocatore ha vinto!");
    }
    else if (bancoScore > userScore) {
        alert("Ha vinto il Banco!");
    }
    else if (userScore > bancoScore) {
        alert("Il giocatore ha vinto!");
    }
    else {
        alert("Pareggio!");
    }

    gameOver = true;
    finePartita();
}

function finePartita() {
    for (let i = 0; i < _chkNum.length; i++) {
        _chkNum[i].disabled = true;
    }
    _btnBanco.disabled = true;
}

function nuovaPartita() {
    // Reset delle variabili
    nBanco = generaNumero(1, 11);
    sommaBanco = nBanco;
    somma = 0;
    gameOver = false;

    // Reset dei text input
    _txtBanco.value = nBanco;
    _txtUser.value = "";

    // Reset dei campi del giocatore
    for (let i = 0; i < _txtNum.length; i++) {
        _txtNum[i].value = "";
        _chkNum[i].disabled = false;
        _chkNum[i].checked = false;
    }

    // Reset del pulsante del banco
    _btnBanco.disabled = false;
}

function generaNumero(min, max) {
    return Math.floor((max - min) * Math.random()) + min;
}
