"use strict"

const _radio = document.getElementsByName("radio");
const _txtRange = document.getElementById("txtRange");
const _btnGenera = document.getElementById("btnGenera");
const _password = document.getElementById("password");
const _spans = document.getElementsByTagName("span");
let length = 12;
let password = "";

window.onload = function() {
    _btnGenera.disabled = true;
    for(const radio of _radio) {
        radio.addEventListener("click", abilitaPulsante);
    }
    _txtRange.addEventListener("input", aggiorna);
    _btnGenera.addEventListener("click", generaPassword);
}

function aggiorna() {
    length = parseInt(_txtRange.value);
    _spans[0].textContent = `lunghezza: ${length}`;
}

function abilitaPulsante() {
    _btnGenera.disabled = false;
}

function random(min, max) {
    return Math.floor((max - min) * Math.random() + min);
}

function generaPassword() {
    password = "";
    let carattere;
    let scelta;
    
    for(const radio of _radio) {
        if(radio.checked) {
            scelta = radio.value;
            break;
        }
    }

    while(password.length < length) {
        switch(scelta) {
            case "lettere":
                carattere = String.fromCharCode(random(65, 91));
                if(random(0,2)) carattere = carattere.toLowerCase();
                password += carattere;
                break;

            case "numeri":
                carattere = String.fromCharCode(random(48, 58));
                password += carattere;
                break;

            case "lettereNumeri":
                let tipo = random(1,4);
                if(tipo === 1) {
                    carattere = String.fromCharCode(random(65, 91));
                } else if(tipo === 2) {
                    carattere = String.fromCharCode(random(97, 123));
                } else {
                    carattere = String.fromCharCode(random(48, 58));
                }
                password += carattere;
                break;

            case "ascii":
                carattere = String.fromCharCode(random(47, 126));
                password += carattere;
                break;
        }
    }
    
    _password.textContent = password;
}



