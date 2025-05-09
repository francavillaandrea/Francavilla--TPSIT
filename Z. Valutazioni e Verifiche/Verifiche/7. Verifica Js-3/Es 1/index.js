"use strict"

const nDOMANDE = 5;
const risposteCorrette = ['d', 'b', 'a', 'c', 'a'];

let punti = 0;
const _q1 = document.getElementsByName("q1");
const _q2 = document.getElementsByName("q2");
const _q3 = document.getElementsByName("q3");
const _q4 = document.getElementsByName("q4");
const _q5 = document.getElementsByName("q5");
const _divRis = document.getElementById("ris");
const _btnVerfica = document.getElementsByTagName("button")[0];

_btnVerfica.addEventListener("click", controllaRisposte);
setProgram();

function setProgram() {
    _divRis.style.display = "none";
    _divRis.textContent = "Voto: ";
    _btnVerfica.disabled = false;
    punti = 0;
    let radioButtons = document.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].checked = false;
    }
}

function controllaRisposte() {
    let allAnswered = true;
    const questions = [_q1, _q2, _q3, _q4, _q5];

    for (let i = 0; i < questions.length; i++) {
        let answered = false;
        for (let j = 0; j < questions[i].length; j++) {
            if (questions[i][j].checked) {
                answered = true;
                break;
            }
        }
        if (!answered) {
            allAnswered = false;
            break;
        }
    }

    if (!allAnswered) {
        alert("Devi rispondere a tutte le domande");
        return;
    }

    punti = 0;
    // Check answers and uncheck wrong ones
    for (let qIndex = 0; qIndex < questions.length; qIndex++) {
        let isCorrect = false;
        let questionGroup = questions[qIndex];

        for (let i = 0; i < questionGroup.length; i++) {
            if (questionGroup[i].checked) {
                if (questionGroup[i].value === risposteCorrette[qIndex]) {
                    punti += 2;
                    isCorrect = true;
                } else {
                    questionGroup[i].checked = false;
                }
            }
        }
        console.log(`Risposta ${qIndex + 1} ${isCorrect ? 'corretta' : 'sbagliata'}`);
    }

    // Display results
    _divRis.style.display = "block";
    _divRis.textContent = "Voto: " + punti;
    _divRis.style.fontWeight = "bold";
    _btnVerfica.disabled = true;
}


