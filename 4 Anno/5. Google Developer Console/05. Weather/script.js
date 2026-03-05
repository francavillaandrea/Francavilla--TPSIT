"use strict"

const address = "Rome, Italy";
const mapStyle = myMapLibre.openMapsStyle;
const zoom = 5.5;
const API_KEY_WEATHER = "c5de2accda48a5c9a19b95146d19ce0d"
const jsonServer = "http://localhost:3000/citta"
const weatherServer = "http://api.openweathermap.org/data/2.5/weather" + API_KEY_WEATHER;

loadPage()

async function loadPage() {
    await loadMap();
    const cities = await ajax.sendRequest("GET", jsonServer).catch(console.error)

    if (cities) {
        for (let city of cities.data) {
            let dataWeather = await ajax.sendRequest("GET", weatherServer, { "q": cities[0].nome }).catch(console.error)
        }
    }
}

async function loadMap() {
    const gpsAddress = await myMapLibre.geocode(address);

    if (gpsAddress) {
        await myMapLibre.drawMap(mapStyle, mapContainer, gpsAddress, zoom)
    }

}
