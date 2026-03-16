"use strict";

let vet = ["mano", "sasso", "forbice"];
let imgUtente = "";
let vittorieUtente = 0;
let vittorieComputer = 0;
let pareggi = 0;

window.onload = function () {
    let _imgUtente = document.getElementById("imgUtente");
    let _imgComputer = document.getElementById("imgComputer");
    let _small = document.getElementsByClassName("small");
    let _btnGioca = document.getElementById("btnGioca");
    let _txtRisultato = document.getElementById("txtRisultato");

    // Imposta stili per la visualizzazione delle immagini
    impostaStileImmagine(_imgUtente);
    impostaStileImmagine(_imgComputer);
    for (let small of _small) {
        impostaStileImmagine(small);
    }

    // Inizializzazione immagini
    _imgComputer.style.backgroundImage = "url('img/vuoto.png')";
    _imgUtente.style.backgroundImage = "url('img/vuoto.png')";

    // Caricamento miniature
    for (let i = 0; i < _small.length; i++) {
        _small[i].style.backgroundImage = "url('img/" + vet[i] + ".png')";
        _small[i].addEventListener("click", function () {
            imgUtente = vet[i];
            _imgUtente.style.backgroundImage = this.style.backgroundImage;
            _imgComputer.style.backgroundImage = "url('img/vuoto.png')";
            _txtRisultato.innerHTML = "";
        });
    }

    // Gestione click pulsante Gioca
    _btnGioca.addEventListener("click", function () {
        if (imgUtente == "") {
            alert("Seleziona prima una mossa!");
            return;
        }

        // Genera mossa computer
        let mossaComputer = vet[random(0, 3)];

        // Visualizza mossa computer
        _imgComputer.style.backgroundImage = "url('img/" + mossaComputer + ".png')";

        // Determina il vincitore
        let risultato = determinaVincitore(imgUtente, mossaComputer);
        _txtRisultato.innerHTML = risultato + "<br><br>Vittorie: Tu " + vittorieUtente + " - Computer " + vittorieComputer + " - Pareggi " + pareggi;
    });
}

function determinaVincitore(sceltaUtente, sceltaComputer) {
    // Vittorie dell'utente
    if (sceltaUtente == "forbice" && sceltaComputer == "mano") {
        vittorieUtente++;
        return "✓ Hai vinto!";
    }
    if (sceltaUtente == "mano" && sceltaComputer == "sasso") {
        vittorieUtente++;
        return "✓ Hai vinto!";
    }
    if (sceltaUtente == "sasso" && sceltaComputer == "forbice") {
        vittorieUtente++;
        return "✓ Hai vinto!";
    }

    // Vittorie del computer
    if (sceltaComputer == "forbice" && sceltaUtente == "mano") {
        vittorieComputer++;
        return "✗ Ha vinto il computer!";
    }
    if (sceltaComputer == "mano" && sceltaUtente == "sasso") {
        vittorieComputer++;
        return "✗ Ha vinto il computer!";
    }
    if (sceltaComputer == "sasso" && sceltaUtente == "forbice") {
        vittorieComputer++;
        return "✗ Ha vinto il computer!";
    }

    // Pareggio
    pareggi++;
    return "= Pareggio!";
}

function random(min, max) {
    return Math.floor((max - min) * Math.random()) + min;
}

function impostaStileImmagine(elemento) {
    elemento.style.backgroundRepeat = "no-repeat";
    elemento.style.backgroundPosition = "center";
    elemento.style.backgroundSize = "contain";
}
