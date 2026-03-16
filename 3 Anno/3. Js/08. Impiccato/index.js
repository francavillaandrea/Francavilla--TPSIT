"use strict";

const nomi =
    ["Italia", "Lavagna", "Pizza", "Lasagne", "Spiedino", "Ananas", "Gnocchi", "Gorgonzola", "Broccoli", "Mango", "Biscotti",
        "Giornale", "Carabina", "Affettati", "Lungimirante", "Affaticato", "Effervescente", "Ambulante", "Ambulanza", "Ostetricia"];
const MAX_TENTATIVI = 5;
const pos = random(0, nomi.length);
let parolaSegreta = nomi[pos].toUpperCase();
const _txtParola = document.getElementById("txtParola");
const _txtLettera = document.getElementById("txtLettera");
const _img = document.querySelector("img");

let parolaVisibile = "";
let tentativi = 0;
let lettereTentate = [];

init();

function init() {
    // Inizializza la parola con asterischi
    for (let i = 0; i < parolaSegreta.length; i++) {
        parolaVisibile += "*";
    }
    _txtParola.value = parolaVisibile;
    _img.src = "img/vuoto.png";
}

function aggiornaParola(s, char, index) {
    return s.substring(0, index) + char + s.substring(index + 1);
}

function elabora() {
    const lettera = _txtLettera.value.toUpperCase();

    // Controlla se la lettera è valida
    if (lettera == "" || lettera.length !== 1) {
        alert("Inserisci una sola lettera!");
        return;
    }

    // Controlla se è già stata tentata
    if (lettereTentate.includes(lettera)) {
        alert("Hai già provato questa lettera!");
        _txtLettera.value = "";
        return;
    }

    lettereTentate.push(lettera);

    // Controlla se la lettera è nella parola
    if (parolaSegreta.includes(lettera)) {
        // Lettera giusta: aggiorna la parola visibile
        for (let i = 0; i < parolaSegreta.length; i++) {
            if (parolaSegreta[i] == lettera) {
                parolaVisibile = aggiornaParola(parolaVisibile, lettera, i);
            }
        }
        _txtParola.value = parolaVisibile;

        // Controlla se ha vinto
        if (parolaVisibile == parolaSegreta) {
            alert("Hai vinto! La parola era: " + parolaSegreta);
            location.reload();
        }
    } else {
        // Lettera sbagliata: incrementa i tentativi
        tentativi++;
        aggiornaImmagine();

        // Controlla se ha perso
        if (tentativi >= MAX_TENTATIVI) {
            alert("Hai perso! La parola era: " + parolaSegreta);
            location.reload();
        }
    }

    _txtLettera.value = "";
}

function aggiornaImmagine() {
    const immagini = ["vuoto.png", "testa.png", "corpo.png", "braccio_sx.png", "braccio_dx.png", "morte.png"];
    _img.src = "img/" + immagini[tentativi];
}

function converti() {
    _txtLettera.value = _txtLettera.value.toUpperCase();
}

function random(a, b) {
    return Math.floor((b - a) * Math.random()) + a;
}
