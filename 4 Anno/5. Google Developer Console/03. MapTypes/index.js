"use strict";

const mapContainer = document.getElementById("mapContainer")
const address = "Via San Michele 68, Fossano, Italia"
const zoom = 15.5  // 1-25
const icon = "url(./img/university.png)"


const mapTypes = ['neutral', 'cartographic', 'dark', 'satellite', 'topo', 'hibrid', 'openMaps']

loadMap()

async function loadMap() {
    let gpsAddress = await myMapLibre.geocode(address)
    for (let mapType of mapTypes) {
        const btn = document.createElement("button");
        btnBox.append(btn);
        btn.textContent = mapType;
        btn.addEventListener("click", async (e) => {
            const styleText = `${e.target.textContent}Style`;
            const style = myMapLibre[styleText];
            mapContainer.innerHTML = "";
            myMapLibre.map = null;
            await myMapLibre.drawMap(style, mapContainer, gpsAddress, zoom)
            myMapLibre.addPOILayer(style)
            myMapLibre.addMarker(gpsAddress, icon, "IIS G. Vallauri");
            for (const btn of btnBox.children) {
                btn.classList.remove("active")
            }
            e.target.classList.add("active");
        })
    }
}

