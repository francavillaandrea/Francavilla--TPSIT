"use strict";

let carteUscite = [];
let punteggioG = 0;
let punteggioB = 0;
let gameOver = false;

function generaCarta() {
    let carta;
    do {
        let numero = Math.floor(Math.random() * 13) + 1;
        let seme = String.fromCharCode(Math.floor(Math.random() * 4) + 97); // a-d
        carta = seme + numero;
    } while (carteUscite.includes(carta));

    carteUscite.push(carta);
    return carta;
}

function getValoreCarta(carta) {
    let valore = parseInt(carta.substr(1));
    if (valore > 10) valore = 10;
    if (valore == 1) valore = 1; // Asso vale 1 o 11 a scelta
    return valore;
}

function giocatoreGioca() {
    if (gameOver) return;

    let carta = generaCarta();
    let valore = getValoreCarta(carta);

    punteggioG += valore;
    document.getElementById("cartaG").style.backgroundImage = "url('img/" + carta + ".gif')";
    document.getElementById("puntiG").textContent = punteggioG;

    if (punteggioG > 21) {
        alert("Il giocatore ha superato 21! Il banco vince!");
        gameOver = true;
        document.getElementById("btnG").disabled = true;
        document.getElementById("btnB").disabled = true;
    }
}

function bancoGioca() {
    if (gameOver) return;

    document.getElementById("btnG").disabled = true;

    // Il banco pesca carte finché non raggiunge 17
    while (punteggioB < 17) {
        let carta = generaCarta();
        let valore = getValoreCarta(carta);
        punteggioB += valore;
        document.getElementById("cartaB").style.backgroundImage = "url('img/" + carta + ".gif')";
    }

    document.getElementById("puntiB").textContent = punteggioB;
    document.getElementById("btnB").disabled = true;

    // Confronto finale
    setTimeout(function () {
        confrontaRisultati();
    }, 500);
}

function confrontaRisultati() {
    if (punteggioG > 21) {
        alert("Il giocatore ha perso (superato 21)!");
    } else if (punteggioB > 21) {
        alert("Il banco ha perso (superato 21)! Il giocatore vince!");
    } else if (punteggioG > punteggioB) {
        alert("Il giocatore vince! (" + punteggioG + " vs " + punteggioB + ")");
    } else if (punteggioB > punteggioG) {
        alert("Il banco vince! (" + punteggioB + " vs " + punteggioG + ")");
    } else {
        alert("Parità! Entrambi hanno " + punteggioG);
    }
    gameOver = true;
}

function nuovaPartita() {
    carteUscite = [];
    punteggioG = 0;
    punteggioB = 0;
    gameOver = false;

    document.getElementById("puntiG").textContent = "0";
    document.getElementById("puntiB").textContent = "0";
    document.getElementById("cartaG").style.backgroundImage = "none";
    document.getElementById("cartaB").style.backgroundImage = "none";
    document.getElementById("btnG").disabled = false;
    document.getElementById("btnB").disabled = false;
}

window.onload = function () {
    document.getElementById("btnG").addEventListener("click", giocatoreGioca);
    document.getElementById("btnB").addEventListener("click", bancoGioca);
    document.getElementById("btnReset").addEventListener("click", nuovaPartita);
};
