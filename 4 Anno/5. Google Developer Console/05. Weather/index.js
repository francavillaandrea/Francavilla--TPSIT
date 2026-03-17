"use strict"

const btn = document.getElementById("button");
const address = "Roma, Italia";
const mapStyle = myMapLibre.openMapsStyle;
const zoom = 5.2;
const API_KEY_METEO = "08d3188a3f75612e89d3e9e63980af0c";
const jsonServer = "http://localhost:3000/citta";
const weatherServer = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=it&APPID=" + API_KEY_METEO;
let canvasContainer = document.getElementById("canvas");
let canvasChart = canvasContainer.querySelector("canvas");
let chart;
let listaCitta;

avvioPagina();

btn.addEventListener("click", function () {
    const title = "Grafico Temperatura";

    const keys = [];
    const values = [];
    const colors = [];

    console.log(listaCitta)
    for (let city of listaCitta) {
        let color = `rgb(${random(0, 256), random(0, 256), random(0, 256)})`
        keys.push(city.nome);
        if (city.meteoInfo.main.temp != undefined) {
            values.push(city.meteoInfo.main.temp);
            colors.push(color)
        }
        else {
            values.push(0);
            color.push(color)
        }
    }

    myBarChart.setChartOptions(title, keys, values, colors);

    if (!chart) {
        chart = new Chart(canvasChart, myBarChart.getChartOptions());
    }
    else {
        chart.update();
    }
});

//Le funzioni che richiamano funzioni asincrone DEVONO essere anch'esse asincrone
//Se una funziona asincrona restituisce un valore esso verrà iniettato all'interno del then della promise
async function avvioPagina() {
    await caricaMappa();

    const httpResponse = await ajax.sendRequest("GET", jsonServer).catch(ajax.errore);

    if (httpResponse) {
        listaCitta = httpResponse.data;

        for (let city of listaCitta) {
            const httpResponseMeteo = await ajax.sendRequest("GET", weatherServer, { "q": city.nome + ",it" })
                .catch(ajax.errore);

            if (httpResponseMeteo) {
                let meteoInfo = httpResponseMeteo.data;
                city.meteoInfo = meteoInfo;

                //Formato standard: Civico Via, Citta, Paese
                //Si potrebbe usare anche city.nome
                let address = meteoInfo.name + ",Italy";
                let gpsAddress = await myMapLibre.geocode(address);

                let popUp = creaPopUp(meteoInfo);

                let marker = await myMapLibre.addMarker(gpsAddress, null, null, popUp);
                marker.getElement().title = city.nome;
            }
        }
    }

}

function creaPopUp(meteoInfo) {
    const nomeCitta = meteoInfo.name;
    const temperaturaCitta = meteoInfo.main.temp;
    const cieloCitta = meteoInfo.weather[0].description;
    const umiditaCitta = meteoInfo.main.humidity;
    const pressioneCitta = meteoInfo.main.pressure;
    const content =
        `
        <h3>${nomeCitta}</h3>
        <div class="row">
            <span>Temperatura</span>
            <strong>${temperaturaCitta}</strong>
        </div>
        <div class="row">
            <span>Cielo</span>
            <strong>${cieloCitta}</strong>
        </div>
        <div class="row">
            <span>Umidità</span>
            <strong>${umiditaCitta}</strong>
        </div>
        <div class="row">
            <span>Pressione</span>
            <strong>${pressioneCitta}</strong>
        </div>
    `;

    const div = document.createElement("div");
    div.classList.add("infoWindow");
    div.style.backgroundImage = `url("./img/${cieloCitta}.jpg")`;
    div.innerHTML = content;

    return div.outerHTML;
}

async function caricaMappa() {
    const gpsAddress = await myMapLibre.geocode(address);

    if (gpsAddress) {
        await myMapLibre.drawMap(mapStyle, mapContainer, gpsAddress, zoom);
    }
}

function random(min, max) {
    return Math.floor((max - min) * Math.random()) + min;
}
