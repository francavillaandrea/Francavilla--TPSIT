"use strict";

//#region VARIABILI

const RIGHE = 18
const COLONNE = 37
const X_OFFSET = 180
const Y_OFFSET = 210;
const MMG = 246060*1000 // msec in un giorno = 86.400.000

//#endregion

//#region PUNTATORI

const msg = wrapper.querySelectorAll("label")[2]
const inputs = wrapper.querySelectorAll("input")
const txtDataInizio = inputs[0]
const txtDataFine = inputs[1]
const btnVisualizzaMappa = wrapper.querySelector("button")

//#endregion

//#region MAIN

let user_id;
let ombrelloni;
let ombrelloniPrenotati = new Set();

wrapper.style.display = "none"
mappa.style.display = "none"

txtDataFine.disabled = true;
btnVisualizzaMappa.disabled = true;

//#endregion

//#region EVENTI

/**
 * Gestisce il login controllando che le credenziali inserite siano presenti nel database
 */
btnLogin.addEventListener("click", function(){
    const txts = login.querySelectorAll("input");
    const name = txts[0].value;
    const password = txts[1].value;
    const tagErrore = login.querySelector("p");

    if(name && password){
        let promise = ajax.sendRequest("GET", "/utenti", {nome: name, password: password});
        promise.catch(ajax.errore);
        promise.then(function(httpResponse){
            if (httpResponse.data.length > 0) {
                user_id = httpResponse.data[0].id;
                login.style.display = "none";
                wrapper.style.display = "";
            }
            else{
                tagErrore.textContent = "Nome utente o password errati";
            }
        });
    }
    else {
        tagErrore.textContent = "Inserire nome utente e password";
    }
});

/**
 * Serve ad abilitare / disabilitare i campi data fine e il pulsante per visualizzare la mappa
 */
txtDataInizio.addEventListener("change", function(){
    if (this.value) {
        txtDataFine.disabled = false;
        btnVisualizzaMappa.disabled = false;

        txtDataFine.min = txtDataInizio.value;
        txtDataFine.value = txtDataInizio.value;
        
        btnVisualizzaMappa.classList.add("buttonEnabled");
    }
    else{
        txtDataFine.disabled = true;
        txtDataFine.value = "";
        btnVisualizzaMappa.disabled = true;
        btnVisualizzaMappa.classList.remove("buttonEnabled");
    }
});

/**
 * Visualizza la mappa degli ombrelloni
 */
btnVisualizzaMappa.addEventListener("click", getOmbrelloni);

//#endregion

//#region FUNZIONI

/**
 * Recupera gli ombrelloni dal server e crea la mappa
 */
function getOmbrelloni(){
    const promise = ajax.sendRequest("GET", "/ombrelloni");
    promise.catch(ajax.errore);
    promise.then(function(httpResponse){
        ombrelloni = httpResponse.data;

        mappa.style.display = "";
        mappa.innerHTML = "";

        console.log(ombrelloni);

        const inizio = txtDataInizio.valueAsDate;
        const fine = txtDataFine.valueAsDate;

        const nGiorni = ((fine - inizio) / MMG) + 1;
        let posIniziale = (inizio - new Date(txtDataInizio.min)) / MMG; // non serve il '+1' perchè 'posIniziale' serve come indice del vettore
        let posFinale = posIniziale + nGiorni - 1;

        let posX, posY, div, pxDaTogliere = 2, id = 1;
        for (let i = 0; i < RIGHE + 1; i++) {
            posY = 16 * i + Y_OFFSET;
            if (i != 9) {
                for (let j = 0; j < COLONNE + 1; j++) {
                    posX = 16 * j + X_OFFSET;

                    if (j != 22) {
                        div = document.createElement("div");
                    
                        div.id = id;
                        div.classList.add("ombrellone");
                        div.style.top = posY;
                        div.style.left = posX - (pxDaTogliere *i);

                        mappa.appendChild(div);   
                        

                        if (isOccupato(id, posIniziale, posFinale)) {
                            div.classList.add("red");
                        }
                        else{
                            div.classList.add("green");
                            div.addEventListener("click", cambiaColore)
                        }

                        id++;
                    }
                }
            }
        }

        const btn = document.createElement("button");
        btn.textContent = "Prenota";
        btn.id = "btnPrenota";
        btn.classList.add("prenota", "button");
        mappa.appendChild(btn);
    });
}

/**
 * Verifica se un ombrellone è occupato o libero
 * @param {*} idObrellone Id dell'ombrellone usato
 * @param {*} posIniziale Posizione inizialeN nel vettore delle prenotazioni
 * @param {*} posFinale Posizione finale nel vettore delle prenotazioni
 * @returns true se è occupato, false se è libero
 */
function isOccupato(idObrellone, posIniziale, posFinale){
    let ombrellone = ombrelloni[idObrellone - 1];

    for (let i = posIniziale; i < posFinale; i++) {
        if (ombrellone.stato[i] !== 0) {
            return true;
        }
    }
    return false;
}

/**
 * Servre ad alternare il colore di un ombrellone ad ogni click
 */
function cambiaColore(){
    this.classList.toggle("blue");

    if (this.classList.contains("blue")) {
        ombrelloniPrenotati.add(this.id);
    }
    else{
        ombrelloniPrenotati.delete(this.id);
    }
    console.log(ombrelloniPrenotati);

    if (ombrelloniPrenotati.size > 0) {
        btnPrenota.disabled = false;
        btnPrenota.classList.add("buttonEnabled");
        btnPrenota.addEventListener("click", prenotaOmbrelloni);
    }
    else{
        btnPrenota.disabled = true;
        btnPrenota.classList.remove("buttonEnabled");
        btnPrenota.removeEventListener("click", prenotaOmbrelloni);
    }
}

/**
 * Serve a prenotare gli ombrelloni selezionati modificando il database per salvare le modifiche
 */
function prenotaOmbrelloni(){
    const inizio = txtDataInizio.valueAsDate;
    const fine = txtDataFine.valueAsDate;

    const nGiorni = ((fine - inizio) / MMG) + 1;
    let posIniziale = (inizio - new Date(txtDataInizio.min)) / MMG;
    let posFinale = posIniziale + nGiorni - 1;

    ombrelloniPrenotati.forEach(ombrellone => {
        // /ombrelloni/${idOmbrellone}
        let statoAggiornato = ombrelloni[ombrellone - 1].stato;

        for (let i = posIniziale; i <= posFinale; i++) {
            statoAggiornato[i] = user_id;
        }
        const promise = ajax.sendRequest("PATCH", /ombrelloni/${ombrellone}, {stato: statoAggiornato});
        promise.catch(ajax.errore);
        promise.then(function(httpResponse){
            console.log(Ombrellone ${ombrellone} prenotato con successo);
            getOmbrelloni();
            ombrelloniPrenotati.clear();
        });
    });
    
}

//#endregion