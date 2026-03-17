"use strict";

const style = myMapLibre.hibridStyle;
const zoom = 16
const icon = "url(./img/restaurant.png)"

infoPercorso.style.display = "none"
loadCitta();

citySelect.addEventListener("change", async function () {
    const cittaScelta = citySelect.value;
    if (!cittaScelta) return;

    infoPercorso.style.display = "none";
    distanceText.textContent = "Distanza stradale: -";
    durationText.textContent = "Tempo di percorrenza: -";

    await loadRistoranti(cittaScelta);
});


async function loadCitta() {
    const response = await ajax.sendRequest("GET", "http://localhost:3000/citta")
        .catch(console.error);

    if (response) {
        response.data.forEach(function (citta) {
            const option = document.createElement("option");
            option.value = citta.nome;
            option.textContent = citta.nome;
            citySelect.appendChild(option);
        });
    }
}


async function loadRistoranti(citta) {
    const response = await ajax.sendRequest("GET", "http://localhost:3000/ristoranti", { citta: citta })
        .catch(console.error);

    if (!response || response.data.length == 0) {
        alert("Nessun ristorante trovato per: " + citta);
        return;
    }

    let gpsCitta = await myMapLibre.geocode(citta + ", Italia")
        .catch(function (err) {
            alert(`Errore nella decodifica dell'indirizzo:\n${err}`);
        });

    if (gpsCitta) {
        await myMapLibre.drawMap(style, mapContainer, gpsCitta, zoom)
            .catch(function (err) {
                alert(`Errore nel rendering della mappa:\n${err}`);
            });

        if (myMapLibre.map) {
            response.data.forEach(function (ristorante) {
                addRistoranteMarker(ristorante);
            });
        }
    }
}


async function addRistoranteMarker(ristorante) {
    const indirizzoCompleto = ristorante.indirizzo + ", " + ristorante.citta + ", Italia";

    let gpsRistorante = await myMapLibre.geocode(indirizzoCompleto)
        .catch(function (err) {
            console.log(`Geocoding fallito per ${ristorante.nome}: ${err}`);
        });

    if (!gpsRistorante) return;

    const popupText =
        `
        <div class="popup-ristorante">
            <h3>${ristorante.nome}</h3>
            <p>${ristorante.indirizzo}</p>
            <p>${ristorante.desc}</p>
            <img src="./img/${ristorante.img}" alt="${ristorante.nome}" onerror="this.style.display='none'">
            <button onclick="visualizzaPercorso('${indirizzoCompleto}')">
                Visualizza Percorso
            </button>
        </div>
    `;

    myMapLibre.addMarker(gpsRistorante, icon, ristorante.nome, popupText);
}


async function visualizzaPercorso(destinazione) {
    const partenza = startAddress.value.trim();

    if (!partenza) {
        alert("Inserisci la tua posizione di partenza nella textbox dedicata!!!");
        return;
    }

    infoPercorso.style.display = "none";
    distanceText.textContent = "Distanza stradale: calcolo in corso...";
    durationText.textContent = "Tempo di percorrenza: calcolo in corso...";

    const result = await myMapLibre.drawSingleRoute(partenza, destinazione, "#676767")
        .catch(function (err) {
            alert(`Errore nel calcolo del percorso:\n${err}`);
        });

    if (result) {
        infoPercorso.style.display = "";

        const distanzaKm = (result.distance / 1000).toFixed(1);
        const durataMin = Math.round(result.duration / 60);

        distanceText.textContent = `Distanza stradale: ${distanzaKm} km`;
        durationText.textContent = `Tempo di percorrenza: ${durataMin} minuti`;
    }
}
