"use strict"

let films = [
    // Id, Title, Favorite, Watch date, Rating (0-5)
    [1, "Pulp Fiction", true, "10-03-2024", 5],
    [2, "21 Grammi", true, "17-03-2024", 3],
    [3, "Star Wars", false, "15-03-2024", 1],
    [4, "Matrix", false, "01-01-2023", 4],
    [5, "Shrek", false, "21-03-2024", 2],
    [6, "Kill Bill Vol. 1", true, "22-04-2024", 5],
    [7, "Inception", true, "18-04-2024", 5]
];


const tBody = document.getElementsByTagName("tbody")[0]

const btnAggiungi = document.getElementById("btn-add")
const btnClear = document.getElementById("btn-clear")
const btnReload = document.getElementById("btn-reload")
const btnCount = document.getElementById("btn-count")
const btnLogin = document.getElementById("btn-login")

btnAggiungi.addEventListener("click", function () {
    let titolo = prompt("Inserire il titolo del nuovo film")
    let preferenza = generaNumero(1, 3);
    preferenza = preferenza == 1 ? true : false;
    let dataDiVisione = (new Date()).toLocaleDateString().replaceAll("/", "-")
    let rating = generaNumero(1, 6)
    let id;
    //films[films.lenght-1]? films[films.lenght-1][0] + 1: 1
    if (films.length > 0) {
        let ultimoFilm = films[films.length - 1]
        id = ultimoFilm[0] + 1
    }
    else {
        id = 1;
    }
    let vet = []
    vet.push(id, titolo, preferenza, dataDiVisione, rating)
    films.push(vet)
    visualizza()
});

btnClear.addEventListener("click", function () {
    films = []
    visualizza()
});

btnReload.addEventListener("click", function () {
    location.reload()
    //location.href = "index.html"
});

btnCount.addEventListener("click", function () {
    const modal = new bootstrap.Modal("#modal-count-films");
    const span = document.getElementById("span-n-films");
    span.textContent = films.length;
    modal.show();
});


btnLogin.addEventListener("click", function () {
    let alert = document.getElementById("alert-login")
    alert.classList.remove("d-none")
    setTimeout(function(){
        alert.classList.add("d-none")
    }, 3000)
});


visualizza()

function visualizza() {
    tBody.innerHTML = ""
    for (let i = 0; i < films.length; i++) {
        let tr = document.createElement("tr")
        tBody.appendChild(tr)

        for (let j = 0; j < films[i].length; j++) {
            let td = document.createElement("td")
            tr.appendChild(td)
            if (j == 2) {
                let chk = document.createElement("input")
                chk.type = "checkbox"
                chk.disabled = true
                chk.checked = films[i][j]
                td.appendChild(chk)
            }
            else if (j == 4) {
                let k = 0
                for (; k < films[i][j]; k++) {
                    let icon = document.createElement("i")
                    icon.classList.add("bi", "bi-star-fill")
                    td.appendChild(icon)

                }
                for (; k < 5; k++) {
                    let icon = document.createElement("i")
                    icon.classList.add("bi", "bi-star")
                    td.appendChild(icon)
                }
            }
            else {
                td.textContent = films[i][j]
            }
        }

    }
}


function generaNumero(min, max) {
    return Math.floor((max - min) * Math.random()) + min;
}
