"use strict"

const nDomande = 5;
const risposteCorrette = ['d', 'b', 'a', 'c', 'a'];

let punti = 0;
const _q1 = document.getElementsByName("q1");
const _q2 = document.getElementsByName("q2");
const _q3 = document.getElementsByName("q3");
const _q4 = document.getElementsByName("q4");
const _q5 = document.getElementsByName("q5");
const _divRis = document.getElementById("ris");
const _btnVerfica = document.getElementsByTagName("button");

_btnVerfica[0].addEventListener("click", controllaRisposte);
setProgram();

function setProgram()
{
    _divRis.style.display = "none";
    _btnVerfica[0].disabled = false;

    const domande = [_q1, _q2, _q3, _q4, _q5];
    for(let domanda of domande)
    {
        for(let i = 0; i < question.length; i++)
        {
            domanda[i].checked = false;
        }
    }
}

function controllaRisposte() {
    const domande = [_q1, _q2, _q3, _q4, _q5];
    for(let question of domande) {
        let risposto = false;
        for(let i = 0; i < question.length; i++) {
            if(question[i].checked) {
                risposto = true;
                break;
            }
        }
        if(!risposto) {
            alert("Devi rispondere a tutte le domande");
            return;
        }
    }

    punti = 0;
    for(let i = 0; i < nDomande; i++) {
        const domandaCorrente = domande[i];
        for(let j = 0; j < domandaCorrente.length; j++) {
            if(domandaCorrente[j].checked && j === risposteCorrette[i].charCodeAt(0) - 97) {
                punti += 2;
                console.log(`risposta ${i+1} corretta`);
                break;
            }
        }
    }

    _divRis.style.display = "block";
    _divRis.textContent += punti;
    _divRis.style.fontWeight = "bold";
    _btnVerfica[0].disabled = true;
}


