"use strict"

const tbody = document.querySelector("tbody")
const dropdownMenuCitta = lstCitta.querySelector(".dropdown-menu");
const dropdownMenuGenere = lstGeneri.querySelector(".dropdown-menu");

divDettagli.style.display = "none";

getCities();
getGenders();

//#region gestione dropdown
async function getCities() {
    let httpResponse = await ajax.sendRequest("GET", "/citta").catch(ajax.errore);
    if (httpResponse) {
        let cities = httpResponse.data;

        dropdownMenuCitta.appendChild(createDropdownItem("Tutte"));
        for (let citta of cities) {
            dropdownMenuCitta.appendChild(createDropdownItem(citta.citta));
        }
    }
}

async function getGenders() {
    let httpResponse = await ajax.sendRequest("GET", "/generi").catch(ajax.errore);
    if (httpResponse) {
        let generi = httpResponse.data;

        dropdownMenuGenere.appendChild(createDropdownItem("Tutti"));
        for (let genere of generi) {
            dropdownMenuGenere.appendChild(createDropdownItem(genere.genere));
        }
    }
}

//Metto l'evento al padre e gli dico di passarmi i valori del figlio che l'ha scatenato
//NOTA: va pefforza passato l'evento come parametro all'interno di function()
function clickDropdownMenuElement(event) {
    this.previousElementSibling.textContent = event.target.textContent;
    getConcerts();
}
dropdownMenuCitta.addEventListener("click", clickDropdownMenuElement);
dropdownMenuGenere.addEventListener("click", clickDropdownMenuElement);

function createDropdownItem(text) {
    let aTag = document.createElement("a");
    aTag.classList.add("dropdown-item");
    aTag.href = "#";
    aTag.textContent = text;

}
//#endregion

// #region creazione tabella
function getConcerts() {
    tbody.innerHTML = "";

    let city = lstCitta.querySelector("button").textContent;
    let genre = lstGeneri.querySelector("button").textContent;

    let filter = {};
    if (city != "Tutte" && !city.includes("Città")) {
        filter["sede.citta"] = city;
    }
    if (genre != "Tutti" && !genre.includes("Generi")) {
        filter["genere"] = genre;
    }

    const promise = ajax.sendRequest("GET", "/concerti", filter);
    promise.catch(ajax.errore);
    promise.then(function (httpResponse) {
        let concerts = httpResponse.data;

        for (let concert of concerts) {
            let tr = document.createElement("tr");
            tbody.appendChild(tr);

            tr.appendChild(creaElementoTabella(concert.id));
            tr.appendChild(creaElementoTabella(concert.cantante));
            tr.appendChild(creaElementoTabella(concert.data));
            tr.appendChild(creaElementoTabella(concert.genere));
            tr.appendChild(creaElementoTabella(concert.sede.citta));
            tr.appendChild(creaElementoTabella(concert.sede.struttura));

            tr.appendChild(creaElementoTabella("Prenota", ["btn", "btn-success", "btn-xs"], concert));
            tr.appendChild(creaElementoTabella("Dettagli", ["btn", "btn-info", "btn-xs"], concert));
        }
    });
}

function creaElementoTabella(text, classes, concert) {
    let td = document.createElement("td");
    //Visto che agli elementi della tabella non vanno aggiunte classi a meno che non
    //siano dei bottoni possiamo controllare se ci passano delle classi
    if (!classes) {
        td.textContent = text;
    }
    else {
        let btn = document.createElement("button");
        td.appendChild(btn);
        btn.textContent = text;

        if (text == "Dettagli") {
            btn.addEventListener("click", () => showDetails(concert.id));
        }
        else {
            btn.addEventListener("click", () => bookConcert(concert));
        }

        for (let auxClass of classes) {
            btn.classList.add(auxClass);
        }
    }

    return td;
}

function showDetails(concertId) {
    const promise = ajax.sendRequest("GET", "/concerti/" + concertId);
    promise.catch(ajax.errore);
    promise.then(function (httpResponse) {
        divDettagli.style.display = "";
        let concert = httpResponse.data;
        let postiLiberi = concert.sede.nPosti - concert.postiPrenotati;

        caricaDettagli([concert.data, concert.sede.citta, concert.sede.struttura, postiLiberi, concert.dettagli]);
    });
}

function caricaDettagli(vDetails) {

    vDetails.forEach(function (element, i) {
        //let span = divDettagli.querySelector(`div:nth-of-type(${i+1})>span:nth-of-type(2)`);
        let span = divDettagli.querySelector(`:scope div:nth-of-type(${i + 1}) span:nth-of-type(2)`);
        span.textContent = element;
    });
}

let btnClose = divDettagli.querySelector("button").addEventListener("click", () => {
    divDettagli.style.display = "none"
})

async function bookConcert(concert) {
    let nTickets = prompt("Inserisci il numero di biglietti che desideri acquistare:");

    if (nTickets === null) return;

    nTickets = parseInt(nTickets);

    if (isNaN(nTickets) || nTickets <= 0 || nTickets > 10) {
        alert("Inserisci un numero valido (1–10).");
        return;
    }

    let postiDisponibili = concert.sede.nPosti - concert.postiPrenotati;

    if (nTickets > postiDisponibili) {
        alert(`Posti disponibili: ${postiDisponibili}`);
        return;
    }

    let nuoviPostiPrenotati = concert.postiPrenotati + nTickets;

    await ajax.sendRequest(
        "PATCH",
        `/concerti/${concert.id}`,
        { postiPrenotati: nuoviPostiPrenotati }
    ).catch(ajax.errore);

    alert("Prenotazione effettuata con successo");

    concert.postiPrenotati = nuoviPostiPrenotati;

    getConcerts();

    let postiLiberi = concert.sede.nPosti - concert.postiPrenotati;
    caricaDettagli([
        concert.data,
        concert.sede.citta,
        concert.sede.struttura,
        postiLiberi,
        concert.dettagli
    ]);

    divDettagli.style.display = "";
}
// #endregion
