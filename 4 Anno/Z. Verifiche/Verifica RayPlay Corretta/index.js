"use strict"
let div_Film = document.getElementById("div_Film");
let div_Dettagli = document.getElementById("div_Dettagli");
let div_Riproduzione = document.getElementById("div_Riproduzione");
let params = {}; // query params used for movie list requests

let listBox = div_Film.querySelector("select");
let elencoFilm = div_Film.querySelector(".elencoFilm")
let chkFree = div_Film.querySelector("input")
let detailsContainer = div_Dettagli.querySelector(".body")
let detailsClose = div_Dettagli.querySelector(".detail-close span")
let altMessage = div_Riproduzione.querySelector("#alt")
let btnIndietro = div_Riproduzione.querySelector("button");
let videoElement = div_Riproduzione.querySelector("video");

let currentMovie = null;
let genresMap = {};

div_Film.style.display = "block";
div_Dettagli.style.display = "none";
div_Riproduzione.style.display = "none";
altMessage.style.display = "none";
chkFree.checked = false;

getGenres();
getMovies();

async function getGenres() {
    // Recupera la lista dei generi dal server
    let httpResponse = await ajax.sendRequest("GET", "/generi").catch(console.error);
    if (httpResponse) {
        let genres = httpResponse.data
        let optTutti = document.createElement("option");
        optTutti.textContent = "Tutti";
        optTutti.value = 0;
        optTutti.selected = true;
        listBox.appendChild(optTutti)
        for (let genre of genres) {
            genresMap[genre.id] = genre.nomeGenere;
            let opt = document.createElement("option")
            opt.textContent = genre.nomeGenere;
            opt.value = genre.id;
            listBox.appendChild(opt);
        }
        listBox.addEventListener("change", function () {
            let selectedGenre = this.value;
            chkFree.checked = false;
            filterMovies(selectedGenre, false)
        })
    }
}

chkFree.addEventListener("change", function () {
    let selectedGenre = listBox.value;
    filterMovies(selectedGenre, this.checked)
});

async function getMovies(params = {}) {
    // Carica tutti i film dal server e li renderizza nella lista
    let httpResponse = await ajax.sendRequest("GET", "/film", params).catch(console.error);
    if (httpResponse) {
        let movies = httpResponse.data
        elencoFilm.innerHTML = "";
        for (let movie of movies) {
            let divContainer = document.createElement("div")
            elencoFilm.appendChild(divContainer)

            let img = document.createElement("img");
            img.src = `./img/${movie.titolo}.png`
            img.addEventListener("click", function () {
                showMovieDetails(movie);
            })
            divContainer.append(img);
        }
    }
}
let quality = "";
async function showMovieDetails(movie) {
    // Richiede i dettagli aggiornati del film dal server e li visualizza
    let httpResponse = await ajax.sendRequest("GET", `/film/${movie.id}`).catch(console.error);
    if (httpResponse) {
        currentMovie = httpResponse.data;

        div_Film.style.display = "none"
        div_Riproduzione.style.display = "none"
        div_Dettagli.style.display = "block";

        detailsContainer.innerHTML = "";

        let imgDetails = document.createElement("img");
        imgDetails.src = `./img/${currentMovie.titolo}.png`
        detailsContainer.append(imgDetails);

        let divWrapper = document.createElement("div")
        detailsContainer.append(divWrapper);

        let h2 = document.createElement("h2");
        h2.textContent = currentMovie.titolo;
        divWrapper.append(h2);

        let p = document.createElement("p");
        let genreName = genresMap[currentMovie.codGenere] || "Sconosciuto";
        p.textContent = `Genere: ${genreName}`;
        divWrapper.append(p)

        p = document.createElement("p");
        p.textContent = `Prezzo: ${currentMovie.prezzo}`;
        divWrapper.append(p)

        p = document.createElement("p");
        p.textContent = `Anno: ${currentMovie.anno}`;
        divWrapper.append(p)

        p = document.createElement("p");
        p.textContent = currentMovie.descrizione;
        divWrapper.append(p)

        let totalViews = currentMovie.nVisualizzazioni.hd + currentMovie.nVisualizzazioni["4k"];
        p = document.createElement("p");
        p.textContent = `Visualizzazioni: ${totalViews}`;
        divWrapper.append(p)

        let btnRiproduciHD = document.createElement("button")
        btnRiproduciHD.innerHTML = `&#9654; &nbsp RIPRODUCI HD`;
        btnRiproduciHD.addEventListener("click", function () {
            quality = "hd"
            playVideo(quality);
        })
        divWrapper.append(btnRiproduciHD)

        let btnRiproduci4K = document.createElement("button")
        btnRiproduci4K.innerHTML = `&#9654; &nbsp RIPRODUCI 4K`;
        btnRiproduci4K.addEventListener("click", function () {
            quality = "4k"
            playVideo(quality);
        })
        divWrapper.append(btnRiproduci4K)
    }
}

async function filterMovies(genre, isFree) {
    // Filtra i film per genere e disponibilità (free o a pagamento)
    let query = {};
    if (genre != 0) {
        query.codGenere = genre;
    }
    if (isFree) {
        query.prezzo = "free";
    }

    let httpResponse = await ajax.sendRequest("GET", "/film", query).catch(console.error);
    if (httpResponse) {
        let movies = httpResponse.data
        elencoFilm.innerHTML = "";
        for (let movie of movies) {
            let divContainer = document.createElement("div")
            elencoFilm.appendChild(divContainer)

            let img = document.createElement("img");
            img.src = `./img/${movie.titolo}.png`
            img.addEventListener("click", function () {
                showMovieDetails(movie);
            })
            divContainer.append(img);
        }
    }
}

async function playVideo(quality) {
    // Riproduce il video selezionato in HD o 4K
    let videoFilename = `video${currentMovie.id}_${quality}.mp4`;
    let videoPath = `./video/${videoFilename}`;

    div_Film.style.display = "none"
    div_Dettagli.style.display = "none";
    div_Riproduzione.style.display = "block";

    document.querySelector("#wrapper h2").textContent = currentMovie.titolo;

    videoElement.onloadeddata = null;
    videoElement.onerror = null;
    videoElement.onended = null;

    videoElement.onloadeddata = () => {
        altMessage.style.display = "none";
    };

    videoElement.onerror = () => {
        altMessage.style.display = "block";
        videoElement.src = "";
    };

    // Quando il video termina, incrementa il contatore e torna ai dettagli
    videoElement.onended = () => {
        incrementVisualization(quality);
        div_Riproduzione.style.display = "none";
        div_Dettagli.style.display = "block";
        videoElement.src = "";
    };

    videoElement.src = videoPath;
}

async function incrementVisualization(field) {
    // Incrementa il contatore delle visualizzazioni sul server
    if (!currentMovie || !field) return;
    let newValue = (currentMovie.nVisualizzazioni[field] || 0) + 1;
    let update = {};
    if (field == "hd") {
        update.nVisualizzazioni = { hd: newValue, "4k": currentMovie.nVisualizzazioni["4k"] };
    } else {
        update.nVisualizzazioni = { hd: currentMovie.nVisualizzazioni.hd, "4k": newValue };
    }
    await ajax.sendRequest("PATCH", `/film/${currentMovie.id}`, update).catch(console.error)
}

detailsClose.addEventListener("click", (event) => {
    // Torna alla lista film quando si preme la X
    div_Film.style.display = "block"
    div_Dettagli.style.display = "none";
    document.querySelector("#wrapper h2").textContent = "molto più di quanto immagini";
});

btnIndietro.addEventListener("click", () => {
    // Torna ai dettagli del film quando si preme INDIETRO
    div_Dettagli.style.display = "block";
    div_Riproduzione.style.display = "none";
    videoElement.src = "";
    incrementVisualization(quality);
});

