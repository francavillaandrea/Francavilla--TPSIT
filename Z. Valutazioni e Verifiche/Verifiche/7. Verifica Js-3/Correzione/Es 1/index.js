// Imposta modalità strict per una migliore gestione degli errori
"use strict"

// Dichiarazione delle costanti per il numero di domande e array con le risposte corrette
const nDomande = 5;
const risposteCorrette = ['d', 'b', 'a', 'c', 'a'];

// Inizializzazione punteggio e riferimenti agli elementi DOM
let punti = 0;
// Recupero dei radio button per ogni domanda
const _q1 = document.getElementsByName("q1");
const _q2 = document.getElementsByName("q2");
const _q3 = document.getElementsByName("q3");
const _q4 = document.getElementsByName("q4");
const _q5 = document.getElementsByName("q5");
// Riferimento al div per mostrare il risultato
const _divRis = document.getElementById("ris");
// Riferimento al bottone di verifica
const _btnVerfica = document.getElementsByTagName("button");

// Aggiunta listener per il click sul bottone e inizializzazione
_btnVerfica[0].addEventListener("click", controllaRisposte);
setProgram();

// Funzione di inizializzazione
function setProgram() {
    // Nasconde il div risultato
    _divRis.style.display = "none";
    // Reset dello stato del bottone (c'è un errore qui con due assegnazioni consecutive)
    _btnVerfica.disabled = true;
    _btnVerfica.disabled = false;

    // Array con tutte le domande
    const domande = [_q1, _q2, _q3, _q4, _q5];
    // Ciclo per deselezionare tutti i radio button
    for(let domanda of domande) {
        for(let i = 0; i < question.length; i++) {
            domanda[i].checked = false;
        }
    }
}

// Funzione per controllare le risposte
function controllaRisposte() {
    // Verifica che tutte le domande abbiano una risposta
    const domande = [_q1, _q2, _q3, _q4, _q5];
    for(let question of domande) {
        let risposto = false;
        for(let i = 0; i < question.length; i++) {
            if(question[i].checked) {
                risposto = true;
                break;
            }
        }
        // Se manca una risposta, mostra alert e interrompe
        if(!risposto) {
            alert("Devi rispondere a tutte le domande");
            return;
        }
    }

    // Controllo delle singole risposte e assegnazione punteggio
    // Ogni risposta corretta vale 2 punti
    let j = 0; 
    // Controllo domanda 1
    for(let i = 0; i < _q1.length; i++) {
        if(_q1[i].checked == true && i == 3) {
            punti += 2;
            console.log("risposta 1 corretta");
            j++;
        }
    }
    // ... [controlli simili per le altre domande]

    // Visualizzazione del risultato finale
    // Stesso comportamento sia per punteggio pieno che parziale
    if(punti == 10) {
        _divRis.style.display = "block";
        _divRis.textContent += punti;
        _divRis.style.fontWeight = "bold";
        _btnVerfica.disabled = true;
    } else {
        _divRis.style.display = "block";
        _divRis.textContent += punti;
        _divRis.style.fontWeight = "bold";
        _btnVerfica.disabled = true;
    }
}