'use strict'

const style = myMapLibre.openMapsStyle
const zoom = 14
const homeIcon = "./img/home.png"
const userIcon = "./img/user.png"
let errore = login.querySelector("span");

details.style.display = "none"
usersList.style.display = "none"
errore.style.display = "none"
const okButton = login.querySelectorAll("button")[0];
let Modal = new bootstrap.Modal("#mdlDiagram")
let userGlobal;

btnDrawGraphics.addEventListener("click", async () => {
    Modal.show();

    let canvas = mdlDiagram.querySelector("canvas")
    let httpResponse = await ajax.sendRequest("GET", "/users", { "location.city": `${userGlobal.location.city}` }).catch(console.error);
    if (httpResponse) {
        let data = httpResponse.data
        const title = `city:${userGlobal.location.city} `;
        let keys = [];
        let values = [];
        let colors = [];
        let max = 0;

        //Popolamento variabili di appoggio
        for (let user of data) {
            keys.push(user.name.first + " " + user.name.last);
            values.push(user.messages);
            //Controllo max
            if (user.cnt > max) {
                max = user.cnt;
            }

            //generazione numeri rgb
            const r = random(0, 255);
            const g = random(0, 255);
            const b = random(0, 255);

            //Aggiunta nel vettore colors del rgb
            colors.push(`rgb(${r}, ${g}, ${b})`);
        }

        myBarChart.setChartOptions(
            title,
            keys,
            values,
            colors,
            max
        );

        canvas.style.display = "";

        //Se chart non è inizializzato lo inizializzo
        if (!chart) {
            //Il canvas deve avere una dimensione definita esplicitamente
            //Uso l'oggetto Chart preso dalla libreria passandogli:
            //il canva e le opzioni create precedentemente
            chart = new Chart(canvas, myBarChart.getChartOptions());
        }
        else {
            //Se chart è già inizializzato aggiorno il grafico
            chart.update();
        }

    }
})

okButton.addEventListener("click", () => {
    verificaLogin();
})

async function verificaLogin() {

    let httpResponse = await ajax.sendRequest("GET", "/users", { "login.username": `${username.value}`, "login.password": `${password.value}` }).catch(console.error);
    if (httpResponse) {
        let data = httpResponse.data;
        let user = data[0];
        userGlobal = user

        login.style.display = "none";
        details.style.display = "block";
        usersList.style.display = "block";

        let userImage = details.querySelector("img")
        userImage.src = user.picture.large;
        let nameContainer = details.querySelector(".name");
        nameContainer.textContent = user.name.first + " " + user.name.last;
        let addressContainer = details.querySelector(".location");
        addressContainer.textContent = user.location.street.name + ", " + user.location.city + ", " + user.location.country;
        let coordinateContainer = details.querySelector(".gps")
        coordinateContainer.textContent = user.location.coordinates.longitude + " " + user.location.coordinates.latitude
        let phoneNumberContainer = details.querySelector(".cell");
        phoneNumberContainer.textContent = user.cell;

        //Mappa
        let gpsUser = await myMapLibre.geocode(addressContainer.textContent)
            .catch(function (err) {
                alert(`Errore nella decodifica dell'indirizzo:\n${err}`);
            });
        if (gpsUser) {
            await myMapLibre.drawMap(style, mapContainer, gpsUser, zoom)
                .catch(function (err) {
                    alert(`Errore nel rendering della mappa:\n${err}`);
                });

            if (myMapLibre.map) {
                addMarker(addressContainer.textContent, user);
            }
        }
        popolaListUser(user);
    }
    else {
        errore.style.display = "block"
    }
}


async function popolaListUser(user) {
    let httpResponse = await ajax.sendRequest("GET", "/users", { "location.city": `${user.location.city}` }).catch(console.error);
    let cityUsers = httpResponse.data
    if (httpResponse) {
        let listUsers;
        let userListContainer = usersList.querySelectorAll(".col-sm-11")[0];
        let currentUser = await ajax.sendRequest("GET", "/users", { "login.username": `${username.value}`, "login.password": `${password.value}` }).catch(console.error);
        for (let user of cityUsers) {
            if (user.id == currentUser.id) {
                listUsers += ""
            }
            else {
                listUsers += `
                <p>
                    <input type="checkbox">
                    <img src="${user.picture.thumbnail}">
                    <span>${user.name.first} ${user.name.last}</span>
                </p>
            `
                userListContainer.innerHTML = listUsers;
                let completeAddress = user.location.street.name + ", " + user.location.city + ", " + user.location.country;
                addMarkerUsers(completeAddress, user)
            }

        }

    }


}

async function addMarker(indirizzo, user) {
    let gpsUser = await myMapLibre.geocode(indirizzo)
        .catch(function (err) {
            console.log(`Geocoding fallito per ${user.nome.first}: ${err}`);
        });

    if (!gpsUser) return;

    const popupText =
        `
        <div class="popup-user">
            <p>${user.name.first} ${user.name.last}</p>
            <p>${indirizzo}</p>
        </div>
    `;

    myMapLibre.addMarker(gpsUser, homeIcon, user.name.first + " " + user.name.last, popupText);
}

async function addMarkerUsers(indirizzo, user) {
    let gpsUser = await myMapLibre.geocode(indirizzo)
        .catch(function (err) {
            console.log(`Geocoding fallito per ${user.nome.first}: ${err}`);
        });

    if (!gpsUser) return;

    const popupText =
        `
        <div class="popup-user">
            <p>${user.name.first} ${user.name.last}</p>
            <p>${indirizzo}</p>
        </div>
    `;

    myMapLibre.addMarker(gpsUser, userIcon, indirizzo, popupText);
}



function random(min, max) {
    return Math.floor((max - min) * Math.random() + min)
}
