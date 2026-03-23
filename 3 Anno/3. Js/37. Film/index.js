"use strict"

const films = [
    // Id, Title, Favorite, Watch date, Rating (0-5)
    [1, "Pulp Fiction", true, "10-03-2024", 5],
    [2, "21 Grammi", true, "17-03-2024", 3],
    [3, "Star Wars", false, "15-03-2024", 1],
    [4, "Matrix", false, "01-01-2023", 4],
    [5, "Shrek", false, "21-03-2024", 2],
    [6, "Kill Bill Vol. 1", true, "22-04-2024", 5],
    [7, "Inception", true, "18-04-2024", 5]
];

window.onload = function () {
    // Inizializza la pagina
    caricaFilm();

    // Evento pulsante conteggio film
    let btnCountFilms = document.getElementById("i-friends");
    if (btnCountFilms) {
        btnCountFilms.addEventListener("click", mostraConteggioFilm);
    }
};

function caricaFilm() {
    let tableBody = document.querySelector("table tbody");

    if (!tableBody) {
        console.log("Tabella non trovata");
        return;
    }

    tableBody.innerHTML = "";

    films.forEach(function (film) {
        let tr = document.createElement("tr");

        // ID
        let tdId = document.createElement("td");
        tdId.textContent = film[0];
        tr.appendChild(tdId);

        // Titolo
        let tdTitolo = document.createElement("td");
        tdTitolo.textContent = film[1];
        tr.appendChild(tdTitolo);

        // Preferito (stella)
        let tdPreferito = document.createElement("td");
        tdPreferito.innerHTML = film[2] ? "⭐" : "☆";
        tdPreferito.style.cursor = "pointer";
        tdPreferito.addEventListener("click", function () {
            film[2] = !film[2];
            caricaFilm();
        });
        tr.appendChild(tdPreferito);

        // Data visione
        let tdData = document.createElement("td");
        tdData.textContent = film[3];
        tr.appendChild(tdData);

        // Voto
        let tdVoto = document.createElement("td");
        tdVoto.textContent = film[4] + "/5";
        tr.appendChild(tdVoto);

        // Elimina
        let tdElimina = document.createElement("td");
        let btnElimina = document.createElement("button");
        btnElimina.textContent = "❌";
        btnElimina.className = "btn btn-sm btn-danger";
        btnElimina.addEventListener("click", function () {
            films.splice(films.indexOf(film), 1);
            caricaFilm();
        });
        tdElimina.appendChild(btnElimina);
        tr.appendChild(tdElimina);

        tableBody.appendChild(tr);
    });
}

function mostraConteggioFilm() {
    let spanFilm = document.getElementById("span-n-films");
    if (spanFilm) {
        spanFilm.textContent = films.length;
        let modal = new bootstrap.Modal(document.getElementById("modal-count-films"));
        modal.show();
    }
}
