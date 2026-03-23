"use strict";

const mapContainer = document.querySelector(".mapContainer")
const results = document.querySelector(".results")

const style = myMapLibre.openMapsStyle;
const zoom = 15.5;
let marker;
let watchId;

let gpsOptions = {
    enableHighAccuracy: false,  // 7 cifre
    timeout: 7000,	// con 5000 ogni tanto va in errore
    maximumAge: 0   // non tenere in cache
}

navigator.geolocation.getCurrentPosition(visualizzaPosizione, errore, gpsOptions);

btnAvvia.addEventListener("click", startWatch);
btnArresta.addEventListener("click", stopWatch);

async function visualizzaPosizione(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const accuracy = position.coords.accuracy.toFixed(2);
    const alt = position.coords.altitude ? position.coords.altitude + "slm" : "non disponibile";

    results.innerHTML =
        `
		${lat}, ${lng}, &plusmn;${accuracy}m, ${alt}
	`;

    const gpsAddress = await myMapLibre.geocode(lng, lat);
    await myMapLibre.drawMap(style, mapContainer, gpsAddress, zoom);
    await myMapLibre.addMarker(gpsAddress);

}

function startWatch() {
    if (!watchId) {
        //invia la lettura ad intervalli regolari dove l'intervallo non è configurabile
        watchId = navigator.geolocation.watchPosition(visualizzaPosizione, errore, gpsOptions);
        alert("lettura posizione avviata");
    }
}

function stopWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        alert("lettura posizione arrestata");
    }
}
function errore(err) {
    results.textContent = `Errore: ${err.code} - ${err.message}`
}



