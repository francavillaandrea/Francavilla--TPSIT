"use strict"

let X0 = 152
let Y0 = 107;
const RIGHE = 18
const COLONNE = 28

const VERDE = "rgba(0, 200, 0, 0.5)"  // semitrasparente
const ROSSO = "rgba(255, 0, 0, 0.5)"  // semitrasparente
const BLU = "rgba(0, 0, 255, 0.5)"  // semitrasparente

let nomeFila = ["T", "S", "R", "Q", "P", "O", "N", "M", "L", "I", "H", "G", "F", "E", "D", "C", "B", "A"]
let nomeColonna = [28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27]

let inizioFine = [
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },

    { "inizio": 1, "fine": 26 },
    { "inizio": 2, "fine": 25 },
    { "inizio": 2, "fine": 25 },
    { "inizio": 3, "fine": 24 },
    { "inizio": 3, "fine": 24 },
    { "inizio": 4, "fine": 23 },
    { "inizio": 4, "fine": 23 },
    { "inizio": 4, "fine": 23 },
]


let wrapper = document.getElementById("wrapper")
let divSpettacoli = document.getElementById("divSpettacoli")
let divMappa = document.getElementById("divMappa")

let titolo = wrapper.querySelector("h3")
let sottotitolo = wrapper.querySelector("p")
let mappa = divMappa.querySelector("div")
let btnAcquista = divMappa.querySelector("button")

divMappa.style.display = "none"
let dataCorrente = new Date().toISOString().substring(0, 10)

getSpettacoli()

async function getSpettacoli() {
    let httpResponse = await ajax.sendRequest("GET", "/spettacoli").catch(ajax.errore)

    if (httpResponse) {
        let spettacoli = httpResponse.data

        for (let spettacolo of spettacoli) {
            let divContenitore = document.createElement("div")
            divSpettacoli.appendChild(divContenitore)

            let divImmagine = document.createElement("div")
            divContenitore.appendChild(divImmagine)

            let img = document.createElement("img")
            divImmagine.appendChild(img)
            divImmagine.classList.add("img")

            img.src = `./img/${spettacolo.titolo}.jpg`

            let div = document.createElement("div")
            divContenitore.appendChild(div)

            div.classList.add("details")

            let p = document.createElement("p")
            div.appendChild(p)
            p.textContent = spettacolo.titolo

            p = document.createElement("p")
            div.appendChild(p)
            p.textContent = spettacolo.autore

            p = document.createElement("p")
            div.appendChild(p)
            p.textContent = spettacolo.data

            p = document.createElement("p")
            div.appendChild(p)
            p.textContent = spettacolo.prezzo

            let btn = document.createElement("button")
            div.appendChild(btn)
            btn.textContent = "Acquista biglietti"

            btn.addEventListener("click", function () {
                visualizzaPosti(spettacolo)
            })

            if (dataCorrente > spettacolo.dataUTC) {
                btn.disabled = true
            }

        }
    }
}

async function visualizzaPosti(spettacolo) {
    divMappa.style.display = "block"
    divSpettacoli.style.display = "none"


    let titolo = wrapper.querySelector("h3")
    titolo.textContent = spettacolo.titolo
    console.log(spettacolo)

    let data = wrapper.querySelector("p")
    data.textContent = spettacolo.data

    let httpResponse = await ajax.sendRequest("GET", `/spettacolo_${spettacolo.id}`).catch(ajax.errore)

    if (httpResponse) {
        mappa.innerHTML = ""
        let posti = httpResponse.data

        let posX, posY, id = 1
        let prenotazioni = []
        btnAcquista.disabled = true

        for (let i = 0; i < nomeFila.length; i++) {
            posY = Y0 + (17.5 * i);

            if (i >= 10) {
                posY += 24;
            }
            let inizio = inizioFine[i].inizio
            let fine = inizioFine[i].fine

            for (let j = inizio; j < fine + 1; j++) {
                posX = X0 + (16.5 * j);

                if (j >= 14) {
                    posX += 33;
                }


                const div = document.createElement("div");
                mappa.appendChild(div);


                div.id = id++
                div.classList.add("poltrona");
                div.style.top = posY + "px";
                div.style.left = posX + "px";

                let nomePoltrona = nomeFila[i] + nomeColonna[j];

                let posto = null;
                for (let k = 0; k < posti.length; k++) {
                    if (posti[k].nome === nomePoltrona) {
                        posto = posti[k];
                        break
                    }
                }


                div.style.backgroundColor = (posto.statoPrenotazione) ? ROSSO : VERDE;


                div.addEventListener("click", function () {

                    if (div.style.backgroundColor == VERDE && div.style.backgroundColor != ROSSO) {
                        div.style.backgroundColor = BLU
                        prenotazioni.push(div.id)

                    }
                    else if (div.style.backgroundColor == BLU && div.style.backgroundColor != ROSSO) {
                        div.style.backgroundColor = VERDE
                        let index = prenotazioni.indexOf(div.id)
                        prenotazioni.splice(index, 1)
                    }

                    if (!prenotazioni.length) {
                        btnAcquista.disabled = true
                    }
                    else {
                        btnAcquista.disabled = false
                    }
                    console.log(prenotazioni)
                })
            }
        }
        btnAcquista.onclick = function () // COSI FACENDO NON AGGIUNGO PIU LISTENER NELLO STESSO PUNTATORE E NON RIPETO LE COSE 2 VOLTE
        {
            prenotaPosti(prenotazioni, spettacolo)
        }
    }
}



function prenotaPosti(prenotazioni, spettacolo) {
    let promises = [];
    for (let i = 0; i < prenotazioni.length; i++) {
        let idPosto = prenotazioni[i]

        let promise = ajax.sendRequest("PATCH", `/spettacolo_${spettacolo.id}/${idPosto}`, { statoPrenotazione: "booked" });

        promises.push(promise);
    }

    //Promise.all genera una nuova promessa il cui then scatta soltanto nel momento in cui tutte le promise interne
    //sono state risolte con esito positivo.
    // Se anche una sola promise va in errore scsatta il catch e verrà dunque impedito il then

    const summaryPromise = Promise.all(promises);
    summaryPromise.catch(ajax.errore);
    summaryPromise.then(function (httpResponse) {
        visualizzaPosti(spettacolo);
        alert("Prenotazione eseguita con successo");
    });
}

