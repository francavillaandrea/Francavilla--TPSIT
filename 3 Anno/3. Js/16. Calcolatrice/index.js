"use strict"

const _btnNumeri = document.getElementsByName("btnNum");
const _btnOperatori = document.getElementsByName("btnOperatore");
const _btnCalcola = document.getElementById("btnCalcola");
const _btnClear = document.querySelector("#btnClear");
const _txtDisplay = document.querySelector("#txtDisplay");

let firstNumber = 0;
let operator = "";
let secondNumber = 0;
let shouldResetDisplay = false;

_btnCalcola.addEventListener("click", calcola);
_btnClear.addEventListener("click", function () {
    _txtDisplay.value = "";
    firstNumber = 0;
    operator = "";
    secondNumber = 0;
    shouldResetDisplay = false;
});

//for(let i = 0; i< _btnNumeri.length; i++)
for (let _btn of _btnNumeri) {
    _btn.addEventListener("click", visualizzaNumero);
}
for (let _btn of _btnOperatori) {
    _btn.addEventListener("click", memorizzaOperatore);
}
function calcola() {
    let ris = 0;
    secondNumber = parseFloat(_txtDisplay.value);

    if (operator === "") {
        return;
    }

    switch (operator) {
        case "+":
            ris = firstNumber + secondNumber;
            break;
        case "-":
            ris = firstNumber - secondNumber;
            break;
        case "*":
            ris = firstNumber * secondNumber;
            break;
        case "/":
            if (secondNumber === 0) {
                alert("Errore: Divisione per zero!");
                _txtDisplay.value = "";
                firstNumber = 0;
                operator = "";
                secondNumber = 0;
                return;
            }
            ris = firstNumber / secondNumber;
            break;
    }

    // Limita i decimali a 6 cifre
    ris = parseFloat(ris.toFixed(6));
    _txtDisplay.value = ris;
    firstNumber = ris;
    operator = "";
    secondNumber = 0;
    shouldResetDisplay = true;
}

function memorizzaOperatore() {
    let currentValue = _txtDisplay.value;

    // Se c'è già un operatore e il display ha un valore, calcola prima
    if (operator !== "" && currentValue !== "") {
        calcola();
        _txtDisplay.value = "";
    }
    else if (currentValue === "") {
        return;
    }
    else {
        firstNumber = parseFloat(currentValue);
        _txtDisplay.value = "";
    }

    operator = this.value;
    shouldResetDisplay = false;
}

function visualizzaNumero() {
    let n = this.value;

    // Se era stata premuta un'operazione, resetta il display
    if (shouldResetDisplay) {
        _txtDisplay.value = "";
        shouldResetDisplay = false;
    }

    // Evita più punti decimali
    if (!(n === "." && _txtDisplay.value.includes("."))) {
        _txtDisplay.value += n;
    }
}
