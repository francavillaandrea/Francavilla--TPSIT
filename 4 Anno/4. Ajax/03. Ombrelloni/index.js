"use strict";
const RIGHE = 18
const COLONNE = 37
const X_OFFSET = 180
const Y_OFFSET = 210;
const MMG = 24 * 60 * 60 * 1000 // msec in un giorno = 86.400.000


const msg = wrapper.querySelectorAll("label")[2]
const inputs = wrapper.querySelectorAll("input")
const dataInizio = inputs[0]
const dataFine = inputs[1]
const btnVisualizzaMappa = wrapper.querySelector("button")

let user_id;
let ombrelloni;

wrapper.style.display = "none";
mappa.style.display = "none";
dataFine.disabled = true;
btnVisualizzaMappa.disabled = true;

btnLogin.addEventListener("click", function () {
    const txts = login.querySelectorAll("input");
    const nome = txts[0].value;
    const password = txts[1].value;
    const tagErrore = login.querySelector("p");

    if (nome && password) {
        //Crea una chiave nome e password che ha il contenuto della variabile passata
        let promise = ajax.sendRequest("GET", "/utenti", { nome, password });

        promise.catch(ajax.errore);
        promise.then(function (httpResponse) {
            if (httpResponse.data.length > 0) {
                user_id = httpResponse.data[0].id;
                wrapper.style.display = "";
                login.style.display = "none";
            }
            else {
                tagErrore.textContent = "Username o Password non validi";
            }
        });
    }
    else {
        tagErrore.textContent = "Inserire username e password";
    }
});

dataInizio.addEventListener("change", function () {
    if (this.value) {
        dataFine.disabled = false;
        btnVisualizzaMappa.disabled = false;

        dataFine.min = dataInizio.value;
        dataFine.value = dataInizio.value;

        btnVisualizzaMappa.classList.add("buttonEnabled");
    }
    else {
        dataFine.disabled = true;
        dataFine.value = "";
        btnVisualizzaMappa.disabled = true;
        btnVisualizzaMappa.classList.remove("buttonEnabled");
    }
});

btnVisualizzaMappa.addEventListener("click", getOmbrelloni);

function getOmbrelloni() {
    const promise = ajax.sendRequest("GET", "/ombrelloni");
    promise.catch(ajax.errore);
    promise.then(function (httpResponse) {
        mappa.style.display = "";
        ombrelloni = httpResponse.data;

        mappa.innerHTML = "";

        //gli assegnamo un valore date perché il value restituisce una string
        const giornoDiInizio = new Date(dataInizio.value);
        const giornoDiFine = dataFine.valueAsDate; //Restituisce direttamente la data come tale

        //Prendo la differenze tra le date e lo divido per i millisecondi in un giorno
        const nGiorni = (giornoDiFine - giornoDiInizio) / MMG + 1;
        let posIniziale = giornoDiInizio - new Date(dataInizio.min);
        let posFinale = (posIniziale + nGiorni) - 1;

        let posX, posY, div;
        let id = 1;
        for (let i = 0; i < RIGHE + 1; i++) {
            if (i != 9) {
                posY = (16 * i) + Y_OFFSET;
                for (let j = 0; j < COLONNE + 1; j++) {
                    if (j != 22) {
                        posX = (16 * j) + X_OFFSET - (2 * i);
                        div = document.createElement("div");
                        div.id = id;
                        isOccupato(id, posIniziale, posFinale) ? div.classList.add("red") : div.addEventListener("click", cambiaColore);
                        div.classList.add("ombrellone");
                        div.style.top = posY;
                        div.style.left = posX;
                        mappa.appendChild(div);
                        id++;
                    }
                }
            }
        }
    });
}

function cambiaColore() {

}

function isOccupato(idOmbrellone, posIniziale, posFinale) {
    let ombrellone = ombrelloni[idOmbrellone - 1];
    let statoOmbrellone = ombrellone.stato;

    for (let i = posIniziale; i <= posFinale; i++) {
        if (statoOmbrellone[i] != 0) {
            return true;
        }
    }

    return false;
}