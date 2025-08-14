"use strict"
const DIM = 10;
let wrapper = document.getElementById("wrapper")
let riga, colonna;
let contatoreBlocco = 0;
let gameOver = false;
let timerId;

for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
        let div = document.createElement("div");
        div.classList.add("cella");
        div.id = `div-${i}-${j}`;
        div.addEventListener("click", gestisciClick);
        wrapper.appendChild(div);
    }
}

function gestisciClick(evento) {
    if(gameOver) return;
    
    let coordinate = this.id.split("-");
    let r = parseInt(coordinate[1]);
    let c = parseInt(coordinate[2]);
    
    // Se clicco sulla bomba
    if(r === riga && c === colonna) {
        terminaGioco("Hai Perso!");
        return;
    }
    
    // Toggle del blocco blu
    if(this.style.backgroundColor === "blue") {
        this.style.backgroundColor = "gray";
    } else {
        this.style.backgroundColor = "blue";
    }
}

function generaBomba() {
    riga = generaNumero(0, DIM);
    colonna = generaNumero(0, DIM);
    let div = document.getElementById(`div-${riga}-${colonna}`);
    div.style.backgroundImage = "url('bomba.png')"
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    let timerId = setInterval(cambiaPosizione, 150);
}

function cambiaPosizione()
{
    
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    timerId = setInterval(spostaBomba, 150);
}

function spostaBomba() {
    if(gameOver) return;
    
    let div = document.getElementById(`div-${riga}-${colonna}`);
    div.style.backgroundImage = "none";
    
    let vecchiaRiga = riga;
    let vecchiaColonna = colonna;
    let direzione = generaNumero(0, 4);
    let nuovaRiga = riga;
    let nuovaColonna = colonna;
    
    switch(direzione) {
        case 0: // su
            if(riga > 0) nuovaRiga--;
            break;
        case 1: // giù
            if(riga < DIM-1) nuovaRiga++;
            break;
        case 2: // sinistra
            if(colonna > 0) nuovaColonna--;
            break;
        case 3: // destra
            if(colonna < DIM-1) nuovaColonna++;
            break;
    }
    
    // Controlla se la nuova posizione è un blocco blu
    let nuovaDiv = document.getElementById(`div-${nuovaRiga}-${nuovaColonna}`);
    if(nuovaDiv.style.backgroundColor === "blue") {
        // La bomba rimane ferma
        nuovaRiga = riga;
        nuovaColonna = colonna;
    }
    
    // Aggiorna il contatore se la posizione non è cambiata
    if(nuovaRiga === riga && nuovaColonna === colonna) {
        contatoreBlocco++;
        if(contatoreBlocco >= 15) {
            terminaGioco("Hai Vinto!");
            return;
        }
    } else {
        contatoreBlocco = 0;
    }
    
    riga = nuovaRiga;
    colonna = nuovaColonna;
    
    div = document.getElementById(`div-${riga}-${colonna}`);
    div.style.backgroundImage = "url('bomba.png')";
}

function terminaGioco(messaggio) {
    gameOver = true;
    clearInterval(timerId);
    alert(messaggio);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

function generaNumero(min, max) {
    return Math.floor((max - min) * Math.random()) + min;
}

generaBomba();
