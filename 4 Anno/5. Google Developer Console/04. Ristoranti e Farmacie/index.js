"use strict";

const style = myMapLibre.openMapsStyle;
const defaultZoom = 13;
const datasetName = "ristoranti";
const datasetPath = "./data/ristoranti.json";
const imgBasePath = "./img";
const fallbackImg = "./img/FotoVallauri.png";

const mapContainer = document.getElementById("mapContainer");
const citySelect = document.getElementById("citySelect");
const startAddressInput = document.getElementById("startAddress");
const infoPercorso = document.getElementById("infoPercorso");
const distanceText = document.getElementById("distanceText");
const durationText = document.getElementById("durationText");


let selectedCity = "";
let markers = [];
let dataset = { citta: [], ristoranti: [] };


window.visualizzaPercorso = visualizzaPercorso;

init();

async function init() {
    infoPercorso.style.display = "none";

    const isOk = await loadDataset().catch(console.error);
    if (!isOk) {
        return;
    }

    loadCities();
    citySelect.addEventListener("change", onCityChange);
}

async function loadDataset() {
    const response = await ajax.sendRequest("GET", datasetPath).catch(console.error);
    if (!response?.data) {
        /* Se response non ha la proprietà data oppure response è nullo/indefinito, la condizione è true e il blocco if viene eseguito*/
        alert("Impossibile caricare i dati locali.");
        return false;
    }

    dataset = response.data;
    return true;
}

function loadCities() {
    const cities = dataset.citta ? dataset.citta : [];
    let opt = document.createElement("option");
    opt.textContent = "Seleziona una città...";
    citySelect.append(opt)

    cities.forEach(city => {
        const nome = city.nome;
        const option = document.createElement("option");
        option.value = nome;
        option.textContent = nome;
        citySelect.appendChild(option);
    });
}

async function onCityChange() {
    selectedCity = citySelect.value;
    infoPercorso.style.display = "none";
    clearRoute();
    removeMarkers();

    if (!selectedCity) {
        return;
    }

    const cityAddress = `${selectedCity}, Italia`;
    const cityGps = await myMapLibre.geocode(cityAddress);
    if (!cityGps) {
        return;
    }

    await myMapLibre.drawMap(style, mapContainer, cityGps, defaultZoom);
    await loadPlacesAndMarkers(selectedCity);
}

async function loadPlacesAndMarkers(cityName) {
    const places = getPlacesForCity(cityName);

    if (places.length == 0) {
        alert(`Nessun locale disponibile a ${cityName}`);
        return;
    }

    const placesWithGps = await geocodeAllPlaces(places);

    addMarkersToMap(placesWithGps);
}

function getPlacesForCity(cityName) {
    const allPlaces = dataset[datasetName] ? dataset[datasetName] : [];
    const places = [];

    for (let i = 0; i < allPlaces.length; i++) {
        if (allPlaces[i].citta == cityName) {
            places.push(allPlaces[i]);
        }
    }
    return places;
}

async function geocodeAllPlaces(places) {
    const geocodeTasks = places.map(async (place) => {
        const fullAddress = `${place.indirizzo}, ${place.citta}, Italia`;
        const gps = await myMapLibre.geocode(fullAddress);
        return { place, fullAddress, gps };
    });

    return Promise.all(geocodeTasks);
}

function addMarkersToMap(placesWithGps) {
    for (let i = 0; i < placesWithGps.length; i++) {
        const item = placesWithGps[i];

        if (item.gps) {
            addPlaceMarker(item.place, item.fullAddress, item.gps);
        }
    }
}

function addPlaceMarker(place, fullAddress, gps) {
    const markerNode = document.createElement("div");
    markerNode.className = "location-marker";

    const popupText = buildPopupHtml(place, fullAddress);
    const popup = new maplibregl.Popup({ offset: [0, -12] }).setHTML(popupText);

    const marker = new maplibregl.Marker({ element: markerNode })
        .setLngLat(gps.center)
        .setPopup(popup)
        .addTo(myMapLibre.map);

    markers.push(marker);
}


function buildPopupHtml(place, fullAddress) {
    const imgPath = `${imgBasePath}/${place.img}`;

    const card = document.createElement("div");
    card.className = "popup-card";

    const h3 = document.createElement("h3");
    h3.textContent = place.nome;
    card.appendChild(h3);

    const p = document.createElement("p");
    p.textContent = place.desc;
    card.appendChild(p);

    const img = document.createElement("img");
    img.src = imgPath;
    img.alt = place.nome;
    img.onerror = function () {
        this.src = fallbackImg;
    };
    card.appendChild(img);

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Visualizza percorso";
    button.onclick = function () {
        window.visualizzaPercorso(fullAddress);
    };
    card.appendChild(button);

    return card.innerHTML;
}

async function visualizzaPercorso(destinationAddress) {
    if (!selectedCity) {
        alert("Seleziona prima una citta.");
        return;
    }

    const fromAddress = startAddressInput.value.trim();
    if (!fromAddress) {
        alert("Inserisci la tua posizione di partenza.");
        return;
    }

    const route = await myMapLibre.drawSingleRoute(fromAddress, destinationAddress);
    if (!route) {
        return;
    }

    const km = Math.round((route.distance / 1000) * 100) / 100;
    const minutes = Math.round(route.duration / 60);

    distanceText.textContent = `Distanza stradale: ${km} km`;
    durationText.textContent = `Tempo di percorrenza: ${minutes} minuti`;
    infoPercorso.style.display = "block";
}

function removeMarkers() {
    markers.forEach((marker) => marker.remove());
    markers = [];
}

function clearRoute() {
    if (!myMapLibre.map) {
        return;
    }

    const routeLayers = [
        "route-line",
        "route-outline",
        "route-line-alt",
        "route-outline-alt",
        "route-line-main",
        "route-outline-main"
    ];

    routeLayers.forEach((layerId) => {
        if (myMapLibre.map.getLayer(layerId)) {
            myMapLibre.map.removeLayer(layerId);
        }
    });

    const routeSources = ["route", "routes"];
    routeSources.forEach((sourceId) => {
        if (myMapLibre.map.getSource(sourceId)) {
            myMapLibre.map.removeSource(sourceId);
        }
    });
}
