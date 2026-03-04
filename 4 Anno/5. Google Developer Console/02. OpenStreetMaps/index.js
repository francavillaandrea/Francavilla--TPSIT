"use strict";

// const style = myFullStyle
const style = myMapLibre.hibridStyle;
const mapContainer = document.getElementById("mapContainer")
const address1 = "Via San Michele 68, Fossano, Italia"
const address2 = "Via Onorato Vigliani, Torino"
const zoom = 15.5  // 1-25
const icon = "url(./img/university.png)"    


infoPercorso.style.display="none"
loadMap();

//Il puntatore conviene prenderlo all'inzio perchè drawMap finisce per creare altri bottoni di zoom rendendo
//sbagliato il querySelector
const btn = document.querySelector("button");

btn.addEventListener("click", async function()
{
    let gpsAddress = await myMapLibre.geocode(address2);
    myMapLibre.drawMap(style,mapContainer,gpsAddress,zoom);
});


async function loadMap(){
    //Soluzione con await:
    let gpsAddress = await myMapLibre.geocode(address1)
    .catch(function(err)
    {
        alert(`Errore nella decodifica dell'indirizzo:\n${err}`); 
    });
        
    if(gpsAddress)
    {
        await myMapLibre.drawMap(style,mapContainer,gpsAddress,zoom).catch(function(err)
        {
            alert(`Errore nel rendering della mappa:\n${err}`);
        });

        if(myMapLibre.map)
        {
            myMapLibre.addPOILayer(style);
            const popupText = 
            `
                <div id="popUp">
                    <p>Istituto superiore specializzato in informatia</p>
                    <img src="./img/fotoVallauri.png">
                </div>
            `;
            myMapLibre.addMarker(gpsAddress,icon,"I.I.S. G.Vallauri Fossano",popupText);

            const result = await myMapLibre.drawSingleRoute(address1,address2,"#00f");

            infoPercorso.style.display = "";
            infoPercorso.children[0].textContent += result.distance;
            infoPercorso.children[1].textContent += `${result.duration/60} minuti`;        
        
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