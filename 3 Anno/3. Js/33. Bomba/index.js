"use strict"

const DIM = 10;
let wrapper = document.getElementById("wrapper");
let riga = generaNumero(0, DIM);
let colonna = generaNumero(0, DIM);
let gameOver = false;
let timerId;

// Crea la griglia
for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
        let div = document.createElement("div");
        div.classList.add("cella");
        div.id = `div-${i}-${j}`;
        div.addEventListener("click", gestisciClick);
        wrapper.appendChild(div);
    }
}

// Posiziona la bomba
let divBomba = document.getElementById(`div-${riga}-${colonna}`);
divBomba.style.backgroundImage = "url('img/bomba.png')";

// La bomba si muove ogni 500ms
timerId = setInterval(spostaBomba, 500);

function gestisciClick(evento) {
    if (gameOver) return;

    let coordinate = this.id.split("-");
    let r = parseInt(coordinate[1]);
    let c = parseInt(coordinate[2]);

    // Se clicco sulla bomba
    if (r === riga && c === colonna) {
        terminaGioco("Hai Perso! 💣");
        return;
    }

    // Segna la cella come cliccata (blu)
    if (this.style.backgroundColor === "blue") {
        this.style.backgroundColor = "gray";
    } else {
        this.style.backgroundColor = "blue";
    }
}

function spostaBomba() {
    if (gameOver) return;

    // Pulisci posizione precedente
    let divVecchia = document.getElementById(`div-${riga}-${colonna}`);
    divVecchia.style.backgroundImage = "none";

    // Genera nuova posizione casuale
    riga = generaNumero(0, DIM);
    colonna = generaNumero(0, DIM);

    // Visualizza bomba nella nuova posizione
    let divNuova = document.getElementById(`div-${riga}-${colonna}`);
    divNuova.style.backgroundImage = "url('img/bomba.png')";
}

function terminaGioco(messaggio) {
    gameOver = true;
    clearInterval(timerId);
    alert(messaggio);
}

function generaNumero(min, max) {
    return Math.floor((max - min) * Math.random()) + min;
}
