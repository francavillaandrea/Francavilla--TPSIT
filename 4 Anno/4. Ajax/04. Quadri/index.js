"use strict"

const head = document.querySelector('.head');
const infoBox = document.querySelector('.info');
const imgBox = document.querySelector('.img');
const btns = document.querySelectorAll("button")
const btnPrev = btns[0]
const btnNext = btns[1]
const wrapperAdd = document.querySelectorAll('.wrapper')[1]

btnPrev.disabled = true;

getArtists();

function getArtists() {
    let promise = ajax.sendRequest("GET", "/artisti");
    promise.catch(ajax.errore);
    promise.then(function (httpResponse) {
        let artisti = httpResponse.data;
        let label, input, opt;

        artisti.forEach(function (artista) {
            //<!-- <label> <input type='radio'> artistname </label> -->
            label = document.createElement("label");
            head.appendChild(label);

            input = document.createElement("input");
            input.type = "radio";
            input.id = artista.id;
            input.name = "artisti";
            label.appendChild(input);
            //Text content sovrascrive l'HTML,
            //label.textContent = artista.name; 
            //al suo posto conviene utilizzare il metodo createTextNode
            label.appendChild(document.createTextNode(artista.name));
            //Oppure label.append(stringa)
        });

        let nArtista = generaNumero(0, artisti.length);
        let id = artisti[nArtista].id;
        head.querySelector(`input[type=radio][id="${id}"]`).checked = true;

        getQuadri()
    });
}


function generaNumero(min, max) {
    return Math.floor((max - min) * Math.random()) + min;
}