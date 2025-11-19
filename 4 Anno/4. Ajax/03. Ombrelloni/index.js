"use strict";
const RIGHE = 18
const COLONNE = 37
const X_OFFSET = 180
const Y_OFFSET = 210;
const MMG = 24*60*60*1000 // msec in un giorno = 86.400.000


const msg = wrapper.querySelectorAll("label")[2]
const inputs = wrapper.querySelectorAll("input")
const dataInizio = inputs[0]
const dataFine = inputs[1]
const btnVisualizzaMappa = wrapper.querySelector("button")

let user_id;
let ombrelloni;

login.show();
wrapper.hide()
mappa.hide()


