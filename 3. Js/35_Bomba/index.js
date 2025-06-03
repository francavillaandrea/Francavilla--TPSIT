"use strict"
const DIM = 10;
let wrapper = document.getElementById("wrapper")
let riga, colonna;

for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
        let div = document.createElement("div");
        div.classList.add("cella");
        div.id = `div-${i}-${j}`;
        wrapper.appendChild(div);
    }
}

generaBomba()

function generaBomba() {
    riga = generaNumero(0, DIM);
    colonna = generaNumero(0, DIM);
    let div = document.getElementById(`div-${riga}-${colonna}`);
    div.style.backgroundImage = "url('bomba.png')"
    let timerId =
}

function generaNumero(min, max) {
    return Math.floor((max - min) * Math.random()) + min;
}
