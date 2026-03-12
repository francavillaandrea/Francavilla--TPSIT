"use strict"

const address = "Rome, Italy";
const mapStyle = myMapLibre.openMapsStyle;
const zoom = 5.5;
const API_KEY_WEATHER = "76057cb5fa5b3fea9eb4824877c0eed2"
const jsonServer = "http://localhost:3000/citta"
const weatherServer = "http://api.openweathermap.org/data/2.5/weather?units=metric&lang=it&APPID=" + API_KEY_WEATHER;

avvioPagina();

//Le funzioni che richiamano funzioni asincrone DEVONO essere anch'esse asincrone
//Se una funziona asincrona restituisce un valore esso verrà iniettato all'interno del then della promise
async function avvioPagina() {
    await caricaMappa();

    const httpResponse = await ajax.sendRequest("GET", jsonServer).catch(console.error);

    if (httpResponse) {
        let cities = httpResponse.data;
        for (let city of cities) {
            const httpResponseMeteo = await ajax.sendRequest("GET", weatherServer, { "q": cities[0].nome + ",it" })
                .catch(console.error);

            if (httpResponseMeteo) {
                let meteoInfo = httpResponseMeteo.data;
            }
        }
    }

}

async function caricaMappa() {
    const gpsAddress = await myMapLibre.geocode(address);

    if (gpsAddress) {
        await myMapLibre.drawMap(mapStyle, mapContainer, gpsAddress, zoom);
    }
}

