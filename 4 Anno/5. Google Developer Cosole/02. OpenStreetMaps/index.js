"use strict";

// const style = myFullStyle
const style = myMapLibre.openMapsStyle
const mapContainer = document.getElementById("mapContainer")
const address1 = "Via San Michele 68, Fossano, Italia"
const address2 = "Via Onorato Vigliani, Torino"
const zoom = 15.5  // 1-25
const icon = "url(./img/university.png)"


infoPercorso.style.display = "none"
loadMap()


async function loadMap() {
    //Soluzione con await:
    let gpsAddress = await myMapLibre.geocode(address1)
        .catch(function (err) {
            alert(`Errore nella decodifica dell'indirizzo:\n${err}`);
        });

    if (gpsAddress) {
        await myMapLibre.drawMap(style, mapContainer, gpsAddress, zoom).catch(function (err) {
            alert(`Errore nel rendering della mappa:\n${err}`);
        });
        if (myMapLibre.map) {
            myMapLibre.addPOILayer(style)
        }
    }

    //Soluzione con then e catch:
    // let promise = myMapLibre.geocode(address1);
    // promise.catch(function(err)
    // {
    //     alert(`Errore nella decodifica dell'indirizzo:\n${err}`);
    // });
    // promise.then(function(gpsAddress)
    // {
    //     //... continuazione
    // });

    //Notare che await riceve una promise, e risolve la automaticamente.
    //Mentre con then e catch siamo noi a gestirla con il then
}
