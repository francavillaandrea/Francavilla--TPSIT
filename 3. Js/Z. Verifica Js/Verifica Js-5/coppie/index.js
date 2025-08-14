"use strict"
const DIM = 4;
let wrapper = document.getElementById("wrapper")
let container = document.getElementsByClassName("container")[0];
let btnGioca = document.getElementsByTagName("button")[0];
let timerId = null;
let cicli = 0;

init()
btnGioca.addEventListener("click", gioca);

function gioca() {
    btnGioca.disabled = true;
    cicli = 0;
    let celle = document.getElementsByClassName('cella');
    let contaGrigie = 0;
    for(let i = 0; i < celle.length; i++) {
        if(celle[i].style.backgroundColor == "#888") {
            contaGrigie++;
        }
    }
    if (contaGrigie < DIM * DIM) {
        btnGioca.disabled = false;
    }
    timerId = setInterval(riempiCella, 50);
}

function riempiCella() {
    let celle = document.getElementsByClassName('cella');
    let libere = [];
    for (let i = 0; i < celle.length; i++) {
        if (celle[i].style.backgroundColor == "") {
            libere.push(celle[i]);
        }
    }
    if (libere.length == 0) return;
    let idx = generaNumero(0, libere.length);
    let div = libere[idx];
    let x = generaNumero(0, 4);
    div.textContent = x;
    cicli++;
    if (cicli >= 80) {
        clearInterval(timerId);
        controllaCoppie();
        let contaGrigie = 0;
        for(let i = 0; i < celle.length; i++) {
            if(celle[i].style.backgroundColor == "#888") {
                contaGrigie++;
            }
        }
        if (contaGrigie == DIM * DIM) {
            alert('Hai vinto');
            btnGioca.disabled = true;
        } else {
            btnGioca.disabled = false;
        }
    }
}

function controllaCoppie() {
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM - 1; j++) {
            let curr = document.getElementById(`${i}-${j}`);
            let next = document.getElementById(`${i}-${j+1}`);
            if (curr.textContent == next.textContent && curr.textContent != "") {
                curr.style.backgroundColor = "#888";
                next.style.backgroundColor = "#888";
            }
        }
    }
    for (let j = 0; j < DIM; j++) {
        for (let i = 0; i < DIM - 1; i++) {
            let curr = document.getElementById(`${i}-${j}`);
            let next = document.getElementById(`${i+1}-${j}`);
            if (curr.textContent == next.textContent && curr.textContent != "") {
                curr.style.backgroundColor = "#888";
                next.style.backgroundColor = "#888";
            }
        }
    }
}

function init() {
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            let div = document.createElement("div")
            div.id = `${i}-${j}`;
            div.classList.add("cella");
            container.appendChild(div)
        }
    }
}

function generaNumero(min, max) {
    return Math.floor((max - min) * Math.random() + min)
}



