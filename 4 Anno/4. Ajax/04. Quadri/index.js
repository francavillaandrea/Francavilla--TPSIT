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
//<label> <input type='radio'> artistname </label> 

function getArtists() {
    let promise = ajax.sendRequest("GET", "/artisti")
    promise.catch(function (httpResponse) {
        let label, input, opt;
        let artisti = httpResponse.data;
        artisti.forEach(artista => {
            
            label = document.createElement("label");
            label.textContent = artista.name;
            head.append(label);

            input = document.createElement("input");
            input.type = "radio";
            input.id = artista.id;
            label.append(input);

            
        });
    });
}




