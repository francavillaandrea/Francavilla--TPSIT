"use strict";
const _divNazione = document.getElementById("nazione");
const _imgNazione = document.getElementById("bandiera");
const _sectionDestra = document.getElementById("cities");
const _btnControlla = document.getElementById("btnControlla");
const _msgRisultato = document.getElementById("risultato");

let citta = [
	"Londra", "Liverpool", "Manchester", "Cambridge",
	"Amsterdam", "Rotterdam", "Maastricht",
	"Lisbona", "Oporto", "Braga",
	"Stoccolma", "Goteborg",
	"Kiev", "Leopoli", "Odessa",
	"Berna", "Lugano", "Zurigo", 
	"Madrid", "Barcellona"
];

let nazioni = [
	"Inghilterra", "Inghilterra", "Inghilterra", "Inghilterra", 
	"Olanda", "Olanda", "Olanda",
	"Portogallo", "Portogallo", "Portogallo",
	"Svezia", "Svezia",
	"Ucraina", "Ucraina", "Ucraina",
	"Svizzera", "Svizzera", "Svizzera",
	"Spagna", "Spagna"
];

let elencoUnivocoNazioni = [];
let nazioneCorrente = "";

window.onload = init;

function init() {
    // Crea elenco univoco nazioni
    elencoUnivocoNazioni = [...new Set(nazioni)];
    
    // Seleziona nazione casuale
    let indexNazione = random(0, elencoUnivocoNazioni.length);
    nazioneCorrente = elencoUnivocoNazioni[indexNazione];
    _divNazione.textContent = nazioneCorrente;
    _imgNazione.src = "./img/" + nazioneCorrente.toLowerCase() + ".png";
    
    // Carica città in modo casuale
    caricaCitta();
    
    // Gestione click pulsante controlla
    _btnControlla.addEventListener("click", controllaSelezione);
}

function caricaCitta() {
    // Ottieni tutti gli elementi esistenti
    let chkBoxes = document.getElementsByName("chkCitta");
    let txtBoxes = document.getElementsByName("txtCitta");
    let imgElements = document.getElementsByClassName("img");
    
    // Crea array di indici casuali
    let indici = Array.from({length: citta.length}, (_, i) => i);
    indici.sort(() => Math.random() - 0.5);
    
    // Assegna i valori agli elementi esistenti
    for(let i = 0; i < citta.length; i++) {
        let indice = indici[i];
        txtBoxes[i].value = citta[indice];
        txtBoxes[i].setAttribute("nazione", nazioni[indice]);
        chkBoxes[i].checked = false;
        imgElements[i].src = "";
    }
}

function controllaSelezione() {
    let selezionateCorrettamente = 0;
    let totaliCorrette = 0;
    let erroriPresenti = false;
    
    // Ottieni tutti gli elementi
    let chkBoxes = document.getElementsByName("chkCitta");
    let txtBoxes = document.getElementsByName("txtCitta");
    let imgElements = document.getElementsByClassName("img");
    
    // Controlla ogni città
    for(let i = 0; i < chkBoxes.length; i++) {
        let chk = chkBoxes[i];
        let txt = txtBoxes[i];
        let img = imgElements[i];
        let nazioneCity = txt.getAttribute("nazione");
        
        if(nazioneCity === nazioneCorrente) {
            totaliCorrette++;
            if(chk.checked) {
                selezionateCorrettamente++;
                // Disabilita e mostra bandiera
                chk.disabled = true;
                txt.disabled = true;
                img.src = "./img/" + nazioneCity.toLowerCase() + ".png";
            }
        } else if(chk.checked) {
            erroriPresenti = true;
        }
    }
    
    // Verifica risultato
    if(selezionateCorrettamente === totaliCorrette && !erroriPresenti) {
        _msgRisultato.textContent = "Bravissimo, hai indovinato tutte le città";
        _btnControlla.disabled = true;
    } else {
        _msgRisultato.textContent = "Non hai finito, Riprova";
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
