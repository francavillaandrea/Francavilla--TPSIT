"use strict";

const mapContainer = document.getElementById("mapContainer")
const address = "Via San Michele 68, Fossano, Italia"
const zoom = 15.5  // 1-25
const icon = "url(./img/university.png)"    


const mapTypes = ['neutral', 'cartographic', 'dark', 'satellite', 'topo', 'hibrid', 'openMaps']

loadMap();

async function loadMap(){
    const gpsAddress = await myMapLibre.geocode(address);

	for(let i = 0; i < mapTypes.length; i++)
    {
        const btn = document.createElement("button");
        btnBox.appendChild(btn);
        btn.textContent = mapTypes[i];
        btn.addEventListener("click", async function()
        {
            const styleText = this.textContent+"Style";
            //Possiamo accedere agli attributi della classe tramite le quadre per la sua natura di JSON
            const style = myMapLibre[styleText];

            //se cambiamo lo stile dobbiamo ridisegnare completamente la mappa
            mapContainer.innerHTML = "";
            myMapLibre.map = null;
            await myMapLibre.drawMap(style,mapContainer,gpsAddress,zoom);
            myMapLibre.addPOILayer(style);
            await myMapLibre.addMarker(gpsAddress,icon,"IIS G.Vallauri");
            
            // for(const btn of btnBox.children)
            // {
            //     btn.classList.remove("active");
            // }
            //oppure
            //Il ? vuol dire che la parte successiva della riga verrà eseguita
            //solo se il valore restituito è diverso da null
            btnBox.querySelector(".active")?.classList.remove("active");
            this.classList.add("active");
        });
    }
}

