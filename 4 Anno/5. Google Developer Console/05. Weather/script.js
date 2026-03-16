"use strict"

const address = "Roma, Italia";
const mapStyle = myMapLibre.openMapsStyle;
const zoom = 5.2;
const API_KEY_METEO = "08d3188a3f75612e89d3e9e63980af0c";
const jsonServer = "http://localhost:3000/citta";
const weatherServer = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=it&APPID=" + API_KEY_METEO;

avvioPagina();

//Le funzioni che richiamano funzioni asincrone DEVONO essere anch'esse asincrone
//Se una funziona asincrona restituisce un valore esso verrà iniettato all'interno del then della promise
async function avvioPagina() {
    await caricaMappa();

    const httpResponse = await ajax.sendRequest("GET", jsonServer).catch(ajax.errore);

    if (httpResponse) {
        let cities = httpResponse.data;
        for (let city of cities) {
            const httpResponseMeteo = await ajax.sendRequest("GET", weatherServer, { "q": city.nome + ",it" })
                .catch(ajax.errore);

            if (httpResponseMeteo) {
                let meteoInfo = httpResponseMeteo.data;

                //Formato standard: Civico Via, Citta, Paese
                //Si potrebbe usare anche city.nome
                let address = meteoInfo.name + ",Italy";
                let gpsAddress = await myMapLibre.geocode(address);

                let marker = await myMapLibre.addMarker(gpsAddress);
                marker.getElement().title = city.nome;
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

