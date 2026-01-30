"use strict";

// ---------------------------
// Puntatori e Variabili
// ---------------------------
const lstMarche = document.querySelector("#lstMarche");
const lstModelli = document.querySelector("#lstModelli");
const tbody = document.querySelector("table tbody");
const table = document.querySelector("table");
const details = document.querySelector(".details");

let marche = [];
let modelli = [];
let automobili = [];
let autoCorrente = null;

// ---------------------------
// Funzioni Helper
// ---------------------------

function creaOpzione(value, text) {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = text;
    return opt;
}

function popolaSelect(select, items, textFunc, defaultText = "Seleziona") {
    select.innerHTML = "";
    select.appendChild(creaOpzione("", defaultText));
    items.forEach(item => {
        select.appendChild(creaOpzione(item.id, textFunc(item)));
    });
}

function creaTd(content) {
    const td = document.createElement("td");
    td.textContent = content;
    return td;
}

// Crea una riga della tabella per un'auto
function creaRigaAuto(auto) {
    const tr = document.createElement("tr");
    tr.dataset.id = auto.id;

    const modello = modelli.find(m => m.id == auto.codModello);

    tr.appendChild(creaTd(modello ? modello.nome : ""));
    tr.appendChild(creaTd(modello ? modello.alimentazione : ""));
    tr.appendChild(creaTd(auto.colore));
    tr.appendChild(creaTd(auto.anno));

    // Immagine
    const tdImg = document.createElement("td");
    const img = document.createElement("img");
    img.src = `./img/${auto.img}`;
    img.width = 80;
    tdImg.appendChild(img);
    tr.appendChild(tdImg);

    // Bottone Dettagli
    const tdDettagli = document.createElement("td");
    const btnDettagli = document.createElement("button");
    btnDettagli.className = "btn btn-success btn-sm btnDettagli";
    btnDettagli.textContent = "Dettagli";
    tdDettagli.appendChild(btnDettagli);
    tr.appendChild(tdDettagli);

    // Bottone Elimina
    const tdElimina = document.createElement("td");
    const btnElimina = document.createElement("button");
    btnElimina.className = "btn btn-secondary btn-sm btnElimina";
    btnElimina.textContent = "Elimina";
    tdElimina.appendChild(btnElimina);
    tr.appendChild(tdElimina);

    return tr;
}

function mostraDettagli(auto) {
    const modello = modelli.find(m => m.id == auto.codModello);
    if (!modello) return;

    autoCorrente = auto;

    txtId.value = autoCorrente.id;
    txtNome.value = modello.nome;
    txtAlimentazione.value = modello.alimentazione;
    txtCilindrata.value = modello.cilindrata;
    txtTarga.value = autoCorrente.targa;
    txtColore.value = autoCorrente.colore;
    txtAnno.value = autoCorrente.anno;
    txtKm.value = autoCorrente.km;
    txtPrezzo.value = autoCorrente.prezzo;
    imgLarge.src = `./img/${autoCorrente.img}`;

    details.style.display = "block";
}

// ---------------------------
// Prende Dati da Json
// ---------------------------
function caricaDati() {
    table.style.display = "none";
    details.style.display = "none";

    ajax.sendRequest("GET", "marche")
        .then(res => popolaSelect(lstMarche, res.data, m => m.nome, "Seleziona Marca"))
        .catch(err => ajax.errore(err));

    ajax.sendRequest("GET", "modelli")
        .then(res => { modelli = res.data; })
        .catch(err => ajax.errore(err));

    ajax.sendRequest("GET", "automobili")
        .then(res => { automobili = res.data; })
        .catch(err => ajax.errore(err));
}


lstMarche.addEventListener("change", e => {
    const idMarca = e.target.value;
    const modelliFiltrati = modelli.filter(m => m.codMarca == idMarca);
    popolaSelect(lstModelli, modelliFiltrati, m => `${m.nome} (${m.alimentazione})`, "Seleziona Modello");

    tbody.innerHTML = "";
    table.style.display = "none";
    details.style.display = "none";
});

lstModelli.addEventListener("change", e => {
    const idModello = e.target.value;
    const autoFiltrate = automobili.filter(a => a.codModello == idModello);

    tbody.innerHTML = "";
    autoFiltrate.forEach(auto => tbody.appendChild(creaRigaAuto(auto)));

    table.style.display = autoFiltrate.length ? "table" : "none";
    details.style.display = "none";
});

tbody.addEventListener("click", e => {
    const target = e.target;
    const riga = target.closest("tr");
    if (!riga) return;

    const idAuto = riga.dataset.id;
    const autoSelezionata = automobili.find(a => a.id == idAuto);
    if (!autoSelezionata) return;

    if (target.classList.contains("btnDettagli")) {
        mostraDettagli(autoSelezionata);
    }

    if (target.classList.contains("btnElimina")) {
        if (!confirm("Sei sicuro di voler eliminare questa auto?")) return;

        ajax.sendRequest("z", "automobili/" + autoSelezionata.id)
            .then(() => {
                riga.remove();
                automobili = automobili.filter(a => a.id != autoSelezionata.id);
                if (autoCorrente && autoCorrente.id == autoSelezionata.id) {
                    details.style.display = "none";
                    autoCorrente = null;
                }
                alert("Auto eliminata!");
            })
            .catch(err => ajax.errore(err));
    }
});

btnAggiorna.addEventListener("click", () => {
    if (!autoCorrente) return;

    const nuovoPrezzo = parseFloat(txtPrezzo.value);
    if (isNaN(nuovoPrezzo)) {
        alert("Inserisci un prezzo valido");
        return;
    }

    ajax.sendRequest("PATCH", "automobili/" + autoCorrente.id, { prezzo: nuovoPrezzo })
        .then(() => {
            autoCorrente.prezzo = nuovoPrezzo;
            const riga = tbody.querySelector(`tr[data-id='${autoCorrente.id}']`);
            if (riga) {
                const modello = modelli.find(m => m.id == autoCorrente.codModello);
                riga.children[0].textContent = modello.nome;
                riga.children[1].textContent = modello.alimentazione;
                riga.children[4].querySelector("img").src = `./img/${autoCorrente.img}`;
            }
            alert("Prezzo aggiornato!");
        })
        .catch(err => ajax.errore(err));
});

caricaDati();
