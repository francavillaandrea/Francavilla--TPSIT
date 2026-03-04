"use strict";

const style = myMapLibre.openMapsStyle;
const mapContainer = document.getElementById("mapContainer");
const citySelect = document.getElementById("citySelect");
const startAddressInput = document.getElementById("startAddress");
const infoPercorso = document.getElementById("infoPercorso");
const distanceText = document.getElementById("distanceText");
const durationText = document.getElementById("durationText");
const defaultZoom = 13;
const datasetName = "ristoranti";
const datasetPath = "./data/ristoranti.json";
const imgBasePath = "./img";
const fallbackImg = "./img/FotoVallauri.png";

let selectedCity = "";
let markers = [];
let dataset = { citta: [], ristoranti: [] };

window.visualizzaPercorso = visualizzaPercorso;

init();

async function init() {
    infoPercorso.style.display = "none";

    const ok = await loadDataset().catch(console.error);
    if (!ok) {
        return;
    }

    loadCities();
    citySelect.addEventListener("change", onCityChange);
}

async function loadDataset() {
    const response = await ajax.sendRequest("GET", datasetPath).catch(console.error);
    if (!response?.data) {
        alert("Impossibile caricare i dati locali.");
        return false;
    }

    dataset = response.data;
    return true;
}

function loadCities() {
    const cities = dataset.citta ?? [];
    citySelect.innerHTML = '<option value="">Seleziona una citta...</option>';

    cities.forEach(({ nome }) => {
        citySelect.insertAdjacentHTML("beforeend", `<option value="${nome}">${nome}</option>`);
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
    const allPlaces = dataset[datasetName] ?? [];
    const places = allPlaces.filter((place) => place.citta === cityName);

    if (places.length === 0) {
        alert(`Nessun locale disponibile a ${cityName}`);
        return;
    }

    const geocodeTasks = places.map(async (place) => {
        const fullAddress = `${place.indirizzo}, ${place.citta}, Italia`;
        const gps = await myMapLibre.geocode(fullAddress);
        return { place, fullAddress, gps };
    });

    const results = await Promise.all(geocodeTasks);
    results
        .filter((item) => item.gps)
        .forEach(({ place, fullAddress, gps }) => addPlaceMarker(place, fullAddress, gps));
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
    const encodedDestination = encodeURIComponent(fullAddress);
    const imgPath = `${imgBasePath}/${place.img}`;

    return `
    <div class="popup-card">
        <h3>${place.nome}</h3>
        <p>${place.desc}</p>
        <img src="${imgPath}" alt="${place.nome}" onerror="this.src='${fallbackImg}'">
        <button type="button" onclick="window.visualizzaPercorso(decodeURIComponent('${encodedDestination}'))">
            Visualizza percorso
        </button>
    </div>`;
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

    const km = (route.distance / 1000).toFixed(2);
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

    ["route-line", "route-outline", "route-line-alt", "route-outline-alt", "route-line-main", "route-outline-main"].forEach((layerId) => {
        if (myMapLibre.map.getLayer(layerId)) {
            myMapLibre.map.removeLayer(layerId);
        }
    });

    ["route", "routes"].forEach((sourceId) => {
        if (myMapLibre.map.getSource(sourceId)) {
            myMapLibre.map.removeSource(sourceId);
        }
    });
}
