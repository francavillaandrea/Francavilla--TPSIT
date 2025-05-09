"use strict"  // Abilita il modalità strict per una migliore gestione degli errori

// Recupero riferimenti agli elementi del DOM
const container1 = document.getElementById("container1");  // Container principale
const _divs = container1.getElementsByTagName("div");     // Lista dei div contenenti le immagini
const _btnVerifca = document.getElementById("btnVerifica"); // Bottone di verifica
let _pRis = document.getElementsByClassName("ris");       // Elemento per mostrare il risultato

// Variabili di supporto
let temp = [];  // Array per tenere traccia delle immagini già utilizzate
let index = 0;  // Indice per la generazione casuale delle immagini

setProgram();  // Inizializza il gioco
_btnVerifca.addEventListener("click", checkImgs);  // Aggiunge listener per la verifica

function setProgram() 
{
    temp = [];  // Reset array temporaneo
    for (let i = 0; i < _divs.length; i++) 
    {
        // Genera un numero casuale univoco da 1 a 9
        do {
            index = random(1, 9);
        } while (temp.includes(index))  // Controlla che il numero non sia già stato usato
        
        temp[i] = index;  // Memorizza il numero generato
        // Imposta l'immagine di sfondo del div
        _divs[i].style.backgroundImage = "url('img/img" + index + ".jpg')";
        // Imposta la proprietà semaforo (true se il numero è <= 4)
        _divs[i].semaforo = (temp[i] <= 4);
        // Imposta il colore del bordo iniziale (verde chiaro)
        _divs[i].style.borderColor = "#AFA";
        // Inizializza lo stato del click
        _divs[i].cliccato = false;
        // Aggiunge il gestore dell'evento click
        _divs[i].addEventListener("click", imgClicked);
    }
}

function imgClicked() 
{
    // Alterna lo stato di selezione dell'immagine
    if(this.cliccato == false) {
        this.cliccato = true;
        this.style.borderColor = "#F00";  // Bordo rosso se selezionato
    }
    else {
        this.cliccato = false;
        this.style.borderColor = "#AFA";  // Bordo verde se deselezionato
    }
}

function checkImgs() 
{
    let corretto = true;
    
    // Controlla tutte le immagini
    for(let i = 0; i < _divs.length; i++) {
        // Verifica se la selezione è corretta rispetto alla proprietà semaforo
        if((_divs[i].cliccato && !_divs[i].semaforo) || (!_divs[i].cliccato && _divs[i].semaforo)) {
            corretto = false;
            break;
        }
    }
    
    // Mostra il risultato appropriato
    if(corretto) {
        _pRis[0].textContent = "Bravo hai indovinato";
        _pRis[0].style.color = "#F00";  // Testo rosso
        _btnVerifca.disabled = true;     // Disabilita il bottone
    } else {
        _pRis[0].textContent = "Riprova";
        _pRis[0].style.color = "#AAA";   // Testo grigio
    }
}

function random(min, max) 
{
    return Math.floor((max - min + 1) * Math.random() + min);
}



