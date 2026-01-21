"use strict"
const head = document.querySelector('.head');
const infoBox = document.querySelector('.info');
const imgBox = document.querySelector('.img');
const btns = document.querySelectorAll('button')
const btnPrev = btns[0]
const btnNext = btns[1]
const wrapperAdd = document.querySelectorAll('.wrapper')[1]
let quadri = []
let indiceQuadro = 0
let like

btnPrev.disabled = true
getArtists()

function getArtists() {
    let promise = ajax.sendRequest("GET", "/artisti")
    promise.catch(ajax.errore)
    promise.then(function (httpResponse) {
        console.log(httpResponse.data)
        let artisti = httpResponse.data

        artisti.forEach(function (artista) {
            const label = document.createElement("label")
            head.appendChild(label)

            const input = document.createElement("input")
            input.type = "radio"
            // Dataset non accetta oggetti richede espressamente delle stringhe. Dunque conviene convertire il json a stringa
            input.dataset.artista = JSON.stringify(artista)
            input.id = artista.id
            input.name = "artisti"
            input.addEventListener("change", function () {
                getQuadri(JSON.parse(input.dataset.artista))
            })
            label.appendChild(input)

            //label.textContent = artista.name
            // textContent sovrascrive l' HTML, al suo posto conviene utlizzare il metodo createTextNode{
            //label.append(artista.name) visto che append accetta stringhe

            label.append(document.createTextNode(artista.name))
        });

        let nArtista = random(0, artisti.length)

        let id = artisti[nArtista].id
        // Notare che le "" sono fondamentali in quanto querySelector è una combinazione di js e css. Passando i parametri senza "" il css potrebbe non riconoscere il valore dunque è obbligatorio l'uso delle virgolette cosi da evitare comportamenti inaspettati
        head.querySelector(`input[type = "radio"][id = "${id}"]`).checked = true

        getQuadri(artisti[nArtista])
    })
}

function getQuadri(artista) {
    let promise = ajax.sendRequest("GET", "/quadri", `{artist: ${artista.id}}`)
    promise.catch(ajax.errore)
    promise.then(function (httpResponse) {
        quadri = httpResponse.data
        console.log(quadri)

        indiceQuadro = 0
        btnPrev.disabled = true
        if (quadri.length > 1) {
            btnNext.disabled = false
        }
        else {
            btnNext.disabled = true
        }
        visualizzaQuadro(indiceQuadro)
    })
}

// Il parametro della funzione sottostante non è l'id del quadro, ma è l'indice del quadro all'interno del vettore quadri
function visualizzaQuadro(indice) {
    let artista = JSON.parse(head.querySelector(`input[type="radio"]:checked`).dataset.artista)

    let quadro = quadri[indice]

    infoBox.innerHTML = ""
    imgBox.innerHTML = ""

    let div = document.createElement("div")
    infoBox.appendChild(div)
    let b = document.createElement("b")
    div.appendChild(b)
    b.textContent = "ID = " + quadro.id

    div = document.createElement("div")
    infoBox.appendChild(div)
    b = document.createElement("b")
    div.appendChild(b)
    b.textContent = "Titolo = " + quadro.title

    div = document.createElement("div")
    infoBox.appendChild(div)
    b = document.createElement("b")
    div.appendChild(b)
    b.textContent = "Genere = " + artista.gender

    div = document.createElement("div")
    infoBox.appendChild(div)
    b = document.createElement("b")
    div.appendChild(b)
    b.textContent = "Like = " + quadro.nLike
    let btnLike = document.createElement("button")
    div.appendChild(btnLike)
    btnLike.classList.add("like")
    btnLike.addEventListener("click", function () {
        quadro.nLike++

        const promise = ajax.sendRequest("PATCH", `/quadri/${quadro.id}`, { nLike: quadro.nLike });
        promise.catch(ajax.errore);
        promise.then(function (httpResponse) {
            getQuadri(artista)
        })
    })

    imgBox.innerHTML =
        `
    <img src="./img/${quadro.img}" title="immagine quadro" alt="Immagine non disponibile">
    `
}

btnNext.addEventListener("click", function () {
    indiceQuadro++
    visualizzaQuadro(indiceQuadro)

    if (indiceQuadro >= quadri.length - 1) {
        btnNext.disabled = true
    }
    if (indiceQuadro > 0) {
        btnPrev.disabled = false
    }

})

btnPrev.addEventListener("click", function () {
    indiceQuadro--;
    let artista = JSON.parse(head.querySelector(`input[type="radio"]:checked`).dataset.artista)
    visualizzaQuadro(indiceQuadro)

    if (indiceQuadro > 0) {
        btnPrev.disabled = false
    }
    else {
        btnPrev.disabled = true
    }
})

function random(min, max) {
    return Math.floor((max - min) * Math.random() + min)
}
