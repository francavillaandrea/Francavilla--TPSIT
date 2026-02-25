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

    let gpsAddress = await myMapLibre.geocode(address1).catch(console.error);
    if (!gpsAdress) {
        console.log(gpsAddress)
    }

}


