"use strict"

const head = document.querySelector('.head');
const infoBox = document.querySelector('.info');
const imgBox = document.querySelector('.img');
const btns = document.querySelectorAll("button")
const btnPrev = btns[0]
const btnNext = btns[1]
const wrapperAdd = document.querySelectorAll('.wrapper')[1]
let quadri;
let indiceQuadro;

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
            //Dataset non accetta oggetti richiede espressamente delle stringhe
            //dunque conviene serializzare l'oggetto
            input.dataset.artista = JSON.stringify(artista);
            input.name = "artisti";
            input.addEventListener("click", function () {
                getQuadri(artista);
            });
            label.appendChild(input);
            //Text content sovrascrive l'HTML,
            //label.textContent = artista.name; 
            //al suo posto conviene utilizzare il metodo createTextNode
            label.appendChild(document.createTextNode(artista.name));
            //Oppure label.append(stringa)
        });

        let nArtista = generaNumero(0, artisti.length);
        let id = artisti[nArtista].id;
        //Notare che le "" sono fondamentali in quanto querySelector è una
        //combinazione di js e css. Passando i parametri senza "" css potrebbe
        //non riconoscere il valore dunque è obbligatorio l'uso delle virgolette
        //così da evitare comportamenti inaspettati
        head.querySelector(`input[type="radio"][id="${id}"]`).checked = true;

        getQuadri(artisti[nArtista]);
    });
}

function getQuadri(artista) {
    let promise = ajax.sendRequest("GET", "/quadri", { artist: `${artista.id}` });
    promise.catch(ajax.errore);
    promise.then(function (httpResponse) {
        quadri = httpResponse.data;

        indiceQuadro = 0;
        btnPrev.disabled = true;
        if (quadri.length > 1) {
            btnNext.disabled = false;
        }
        else {
            btnNext.disabled = true;
        }
        visualizzaQuadro(quadri[indiceQuadro]);
    });
}

// Il parametro della funzione sottostante non è l'id del quadro,
// ma è l'indice del quadro nel vettore quadri
function visualizzaQuadro(quadro) {
    let artista = JSON.parse(head.querySelector(`input[type="radio"]:checked`).dataset.artista);
    //Notare che facendo l'evento nel HTML non ci sarà un this e che se gli si passa un'oggetto
    //esso va serializzato.
    infoBox.innerHTML =
        `
        <div>ID=<b>${quadro.id}</b></div>
        <div>TITOLO=<b>${quadro.title}</b></div>
        <div>GENERE=<b>${artista.gender}</b></div>
        <div>
            LIKE=<b>${quadro.nLike}</b>
            <img src="./img/like.jpg" class="like">
        </div>
    `;
    //onclick='addLike(${JSON.stringify(quadro)})
    infoBox.querySelector("img").addEventListener("click", function () {
        addLike(quadro);
    });
    //Se si usa innerHTML lo style nel tag deve essere in formato CSS non JS
    //NOTA: Se hai un'immagine in formato base64 non si deve mettere il path ma solo 
    //il nome del file con estensione
    let img = quadro.img.startsWith("data:image/") ? quadro.img : `./img/${quadro.img}`;
    imgBox.innerHTML =
        `
        <img src="${img}" style="max-height:120px" title="immagine quadro" alt="immagine non disponibile"></img>
    `;
}

btnNext.addEventListener("click", function () {
    indiceQuadro++;
    visualizzaQuadro(quadri[indiceQuadro]);

    if (indiceQuadro >= quadri.length - 1) {
        btnNext.disabled = true;
    }
    btnPrev.disabled = false;
});

btnPrev.addEventListener("click", function () {
    indiceQuadro--;
    visualizzaQuadro(quadri[indiceQuadro]);

    if (indiceQuadro == 0) {
        btnPrev.disabled = true;
    }
    btnNext.disabled = false;
});

async function addLike(quadro) {
    let likeIncrementati = quadro.nLike + 1;
    //Await blocca il codice finché non viene risolta la promise e restituisce il valore che
    //verrebbe normalmente inniettato al then
    //Notare che la modifica PATCH funziona solo sulla base dell'ID, i dati che voglio settare
    const httpResponse = await ajax.sendRequest("PATCH", `/quadri/${quadro.id}`, { nLike: likeIncrementati })
        .catch(ajax.errore);

    //Controllo che la risposta non sia undefined, quindi solo se la promise ha avuto successo
    if (httpResponse) {
        //Abbiamo 3 tipi di richieste get possibili in questo caso
        //1. Direttamente in urlencoded
        const httpResponse2 = await ajax.sendRequest("GET", `/quadri?id=${quadro.id}`).catch(ajax.errore);
        if (httpResponse2) {
            let quadroAggiornato = httpResponse2.data[0];

            quadri[indiceQuadro] = quadroAggiornato;
            visualizzaQuadro(quadri[indiceQuadro]);
        }
        //2. Gli passiamo l'inizio del link e un vettore associativo che però funziona solo nel nostro
        //caso visto che converte l'oggetto in urlencoded
        //const httpResponse2 = await ajax.sendRequest("GET","/quadri",{id: quadro.id});
        //3. Questa è di nuovo standard e funziona solamente con un'id.
        //const httpResponse2 = await ajax.sendRequest("GET",`/quadri/${quadro.id}`);

        //NOTA: Le modalità 1 e 2 restituisce un vettore perché sono generiche
        //mentre la terza modalità restituisce un solo JSON e non un vettore
    }

}

btnSalva.addEventListener("click", async function () {
    let imageBlob = lstFile.files[0];
    if(!imageBlob || !txtTitolo.value)
    {
        alert("Si prega di compilare i campi");
    }
    else
    {
        let base64Img = await base64Convert(imageBlob).catch(function (err) { alert(err) });
        let parsedArtist = JSON.parse(document.querySelector("input[type=radio]:checked").dataset.artista);
        let httpResponse = await ajax.sendRequest("POST","/quadri",{artist: parsedArtist.id,title:txtTitolo.value
            ,img:base64Img,nLike:0}).catch(ajax.errore);
        if(httpResponse)
        {
            alert("Quadro inserito correttamente");
            getQuadri(parsedArtist);
        }
    }
});

function base64Convert(blob) {
    return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function (event) {
            resolve(event.target.result); // event.target sarebbe reader
        };
        reader.onerror = function (error) {
            reject(error);
        };
    })
}


    function generaNumero(min, max) {
        return Math.floor((max - min) * Math.random()) + min;
    }
