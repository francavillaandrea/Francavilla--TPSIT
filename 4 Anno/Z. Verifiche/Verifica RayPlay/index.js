"use strict"
let listBox = div_Film.querySelector("select");
let elencoFilm = div_Film.querySelector(".elencoFilm")
let chkFree = div_Film.querySelector("input")
let detailsContainer = div_Dettagli.querySelector(".body")
let detailsClose = div_Dettagli.querySelector(".detail-close")

div_Dettagli.style.display = "none";
div_Riproduzione.style.display = "none";
div_Dettagli.style.display = "none";
chkFree.checked = false;

getGenres();
getMovies();

async function getGenres() {
    let httpResponse = await ajax.sendRequest("GET", "/generi")
    if (httpResponse) {
        let genres = httpResponse.data
        let optTutti = document.createElement("option");
        optTutti.textContent = "Tutti";
        optTutti.value = 0;
        listBox.appendChild(optTutti)
        for (let genre of genres) {
            let opt = document.createElement("option")
            opt.textContent = genre.nomeGenere;
            opt.value = genre.id;
            listBox.appendChild(opt);
        }
        listBox.addEventListener("change", function () {
            let selectedGenre = this.value;

            filterMovies(selectedGenre)
        })
    }
}
chkFree.addEventListener("change", function () {
    let free;
    if (this.checked == true) {
        free = true;
    }
    else {
        free = false;
        getMovies()
    }
    filterMovies(1, free)
});

async function getMovies(params) {
    let httpResponse = await ajax.sendRequest("GET", "/film")
    if (httpResponse) {
        let movies = httpResponse.data
        for (let movie of movies) {
            let divContainer = document.createElement("div")
            elencoFilm.appendChild(divContainer)

            let img = document.createElement("img");
            img.src = `./img/${movie.titolo}.png`
            img.addEventListener("click", function () {
                div_Film.style.display = "none"
                div_Riproduzione.style.display = "none"
                div_Dettagli.style.display = "block";

                detailsContainer.innerHTML = "";

                let imgDetails = document.createElement("img");
                imgDetails.src = `./img/${movie.titolo}.png`
                detailsContainer.append(imgDetails);

                let divWrapper = document.createElement("div")
                detailsContainer.append(divWrapper);

                let p = document.createElement("p");
                p.textContent = movie.titolo;
                divWrapper.append(p);

                p = document.createElement("p");
                p.textContent = movie.genere;
                divWrapper.append(p)

                p = document.createElement("p");
                p.textContent = `prezzo: ${movie.prezzo}`;
                divWrapper.append(p)

                p = document.createElement("p");
                p.textContent = movie.descrizione;
                divWrapper.append(p)

                let btnRiproduci = document.createElement("button")
                btnRiproduci.innerHTML = `&#9654; &nbsp RIPRODUCI HD`;
                btnRiproduci.addEventListener("click", async function () {
                    alt.style.display = "none";
                    div_Riproduzione.style.display = "block"
                    div_Dettagli.style.display = "none";
                    let video = div_Riproduzione.querySelector("video");
                    video.src = `./video/video${movie.id}_hd.mp4`
                    let httpResponse = await ajax.sendRequest("PATCH", "/film/nVisualizzazioni", { hd: hdTot})


                })
                divWrapper.append(btnRiproduci)
                let nVisualizzazioni = movie["nVisualizzazioni"]
                let hdTot = movie.nVisualizzazioni.hd;
                btnRiproduci = document.createElement("button")
                btnRiproduci.innerHTML = `&#9654; &nbsp RIPRODUCI 4K`;
                btnRiproduci.addEventListener("click", async function () {
                    alt.style.display = "none";
                    div_Riproduzione.style.display = "block"
                    div_Dettagli.style.display = "none";
                    video.src = `./video/video${movie.id}_4k.mp4`;
                    hdTot++
                    let httpResponse = await ajax.sendRequest("PATCH", "/film/", {hd: hdTot })


                })
                divWrapper.append(btnRiproduci)

                p = document.createElement("p");
                p.textContent = `visualizzazioni: ${hd + nVisualizzazioni["4k"]}`;
                divWrapper.append(p)

                detailsClose.addEventListener("click", () => {
                    div_Film.style.display = "block"
                    div_Dettagli.style.display = "none";
                })
                let btnIndietro = div_Riproduzione.querySelector("button");
                btnIndietro.addEventListener("click", async () => {
                    div_Riproduzione.style.display = "none"
                    div_Dettagli.style.display = "block";
                })

            })
            divContainer.append(img);
        }
    }
}

async function filterMovies(genre, isFree) {
    elencoFilm.innerHTML = ""
    if (isFree) {
        isFree = "free"
    }
    let httpResponse = await ajax.sendRequest("GET", "/film", { codGenere: genre, prezzo: isFree })
    console.log(genre, isFree)
    if (httpResponse) {
        let movies = httpResponse.data
        console.log(movies)
        for (let movie of movies) {
            let divContainer = document.createElement("div")
            elencoFilm.appendChild(divContainer)

            let img = document.createElement("img");
            img.src = `./img/${movie.titolo}.png`
            divContainer.append(img);
        }
    }
}

