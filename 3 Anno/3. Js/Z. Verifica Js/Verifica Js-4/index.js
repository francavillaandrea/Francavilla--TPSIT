"use strict"

const DIM = 5;
const parole = ["Barca", "Fiore", "Gente", "Fuoco", "Fungo", "Opaco", "Prova", "Sasso", "Scusa", "Torta", "Vespa"];
let parolaSegreta;
let rigaCorrente;
let tent = 0;
const wrapper = document.getElementById("wrapper");
const _txtParola = document.getElementsByTagName("input")[0];


for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
        let div = document.createElement("div");
        div.classList.add("cella");
        div.id = `div-${i}-${j}`;
        wrapper.appendChild(div);
        parolaSegreta = parole[generaNumero(1, parole.length)];

    }
}
let div = document.getElementById("div-0-0")
div.textContent = parolaSegreta[0];
_txtParola.focus();
_txtParola.addEventListener("input", convertiLettera)
rigaCorrente = 0;
function verifica(event) {
    switch (event.key) {
        case "Enter":
            {
                let temp = _txtParola.value;
                for (let i = 0; i < parolaSegreta.length; i++) {
                    if (temp.length < parolaSegreta.length) {
                        alert("La parola inserita è troppo corta!!")
                        _txtParola.focus();
                        return;
                    }
                    else {
                        if (parolaSegreta[i] == temp[i]) {

                            let div = document.getElementById(`div-${rigaCorrente}-${i}`);
                            div.style.backgroundColor = "#0F0"
                            div.textContent = temp[i];
                            rigaCorrente++;


                        }
                        else if (parolaSegreta.includes(temp[i] && parolaSegreta[i] != temp[i])) {
                            let div = document.getElementById(`div-${rigaCorrente}-${i}`);
                            div.style.backgroundColor = "YELLOW"
                            div.textContent = temp[i];
                            rigaCorrente++;
                        }



                    }
                }


            }
    }

}

function convertiLettera() {
    _txtParola.value = _txtParola.value.toUpperCase();
}

function generaNumero(a, b) {
    return Math.floor((b - a) * Math.random()) + a;
}

