"use strict";

const tbody = document.querySelector("tbody");

// Prendo correttamente i due dropdown
const dropdownMenuCity = lstCitta.querySelector(".dropdown-menu");
const dropdownMenuGenre = lstGeneri.querySelector(".dropdown-menu");

divDettagli.style.display = "none";

getCities();
getGenres();

/* ------------------ CITTÀ ------------------ */
async function getCities() {
    let httpResponse = await ajax.sendRequest("GET", "/citta").catch(ajax.errore);
    if (httpResponse) {
        let cities = httpResponse.data;

        dropdownMenuCity.appendChild(createDropdownItem("Tutte"));
        for (let citta of cities) {
            dropdownMenuCity.appendChild(createDropdownItem(citta.citta));
        }
    }
}

dropdownMenuCity.addEventListener("click", function (event) {
    if (!event.target.classList.contains("dropdown-item")) return;

    this.previousElementSibling.textContent = event.target.textContent;
    getConcerts();
});

/* ------------------ GENERI ------------------ */
async function getGenres() {
    let httpResponse = await ajax.sendRequest("GET", "/generi").catch(ajax.errore);
    if (httpResponse) {
        let genres = httpResponse.data;

        dropdownMenuGenre.appendChild(createDropdownItem("Tutte"));
        for (let genre of genres) {
            dropdownMenuGenre.appendChild(createDropdownItem(genre.genere));
        }
    }
}

dropdownMenuGenre.addEventListener("click", function (event) {
    if (!event.target.classList.contains("dropdown-item")) return;

    this.previousElementSibling.textContent = event.target.textContent;
    getConcerts();
});

/* ------------------ CONCERTI ------------------ */
function getConcerts() {
    let city = lstCitta.querySelector("button").textContent;
    let genre = lstGeneri.querySelector("button").textContent;

    let filter = {};

    if (city != "Tutte" && !city.includes("Città")) {
        filter["sede.città"] = city;
    }

    if (genre != "Tutti" && !genre.includes("Generi")) {
        filter["genere"] = genre;
    }

    const promise = ajax.sendRequest("GET", "/concerti", filter);
    promise.catch(ajax.errore);
    promise.then(() => {
        let concerts = httpResponse;

        concerts.forEach(concert => {
            let trTag = document.createElement("tr");
            tbody.append(trTag);
            trTag.appendChild(creaCella(concert.id));
            trTag.appendChild(creaCella(concert.cantante));
            trTag.appendChild(creaCella(concert.data));
            trTag.appendChild(creaCella(concert.genere));
            trTag.appendChild(creaCella(concert.sede.citta));
            trTag.appendChild(creaCella(concert.sede.struttura));

            let tdTag = creaCella();
            let btn = document.createElement("button");
            tdTag.append(btn);
            btn.textContent = "Dettagli";
            btn.classList.add("btn", "btn-info", "btn-xs ");
            trTag.append(tdTag);

        });

    })
}
/*  --------------- UTILS ------------------ */
function createDropdownItem(text) {
    let aTag = document.createElement("a");
    aTag.classList.add("dropdown-item");
    aTag.href = "#";
    aTag.textContent = text;
    return aTag;
}

function creaCella(concert) {

}
