'use strict'

const style = myMapLibre.openMapsStyle
const zoom = 14
const homeIcon = "./img/home.png"
const userIcon = "./img/user.png"

login.style.display = "block"
details.style.display = "none"
usersList.style.display = "none"
login.querySelector("span").style.visibility = "hidden"
let Modal = new bootstrap.Modal("#mdlDiagram")
let userGlobal;
let chart;

const okButton = login.querySelectorAll("button")[0];
const saveButton = mdlDiagram.querySelector(".btn-success");

btnDrawGraphics.addEventListener("click", async () => {
    if (!userGlobal) return;

    Modal.show();
    let canvas = mdlDiagram.querySelector("canvas")
    let httpResponse = await ajax.sendRequest("GET", "/users", { "location.city": `${userGlobal.location.city}` }).catch(console.error);
    if (!httpResponse || !httpResponse.data) return;

    let data = httpResponse.data
    const title = `city: ${userGlobal.location.city}`;
    let keys = [];
    let values = [];
    let colors = [];

    //Popolamento variabili di appoggio
    for (let user of data) {
        keys.push(user.name.first + " " + user.name.last);
        values.push(Array.isArray(user.messages) ? user.messages.length : 0);

        //generazione numeri rgb
        const r = random(0, 255);
        const g = random(0, 255);
        const b = random(0, 255);

        //Aggiunta nel vettore colors del rgb
        colors.push(`rgb(${r}, ${g}, ${b})`);
    }

    myBarChart.setChartOptions(title, keys, values, colors);
    canvas.style.display = "block";

    if (!chart) {
        canvas.width = 800;
        canvas.height = 480;
        chart = new Chart(canvas, myBarChart.getChartOptions());
    } else {
        chart.data = myBarChart.getChartOptions().data;
        chart.options = myBarChart.getChartOptions().options;
        chart.update();
    }
})

okButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    verificaLogin();
    return false;
})

async function verificaLogin() {
    let httpResponse = await ajax.sendRequest("GET", "/users", { "login.username": `${username.value}`, "login.password": `${password.value}` }).catch(console.error);
    if (!httpResponse || !httpResponse.data || httpResponse.data.length == 0) {
        login.querySelector("span").style.visibility = "visible"
        return;
    }

    let user = httpResponse.data[0];
    userGlobal = user

    await ajax.sendRequest("PATCH", `/users/${user.id}`, { logged: true }).catch(console.error);
    user.logged = true;

    login.style.display = "none";
    details.style.display = "block";
    usersList.style.display = "block";
    login.querySelector("span").style.visibility = "hidden"

    let userImage = details.querySelector("img")
    userImage.src = user.picture.large;
    let nameContainer = details.querySelector(".name");
    nameContainer.textContent = user.name.first + " " + user.name.last;
    let addressContainer = details.querySelector(".location");
    addressContainer.textContent = user.location.street.number + " " + user.location.street.name + ", " + user.location.city + ", " + user.location.country;
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
            let coordinateContainer = details.querySelector(".gps")
            coordinateContainer.textContent = gpsUser.center[0].toFixed(7) + " " + gpsUser.center[1].toFixed(7)
        }
    }
    popolaListUser(user);
}


async function popolaListUser(user) {
    let httpResponse = await ajax.sendRequest("GET", "/users", { "location.city": `${user.location.city}` }).catch(console.error);
    if (!httpResponse || !httpResponse.data) return;

    let cityUsers = httpResponse.data;
    let listUsers = "";
    let userListContainer = usersList.querySelectorAll(".col-sm-11")[0];
    userListContainer.innerHTML = "";
    let currentUser = userGlobal;

    for (let otherUser of cityUsers) {
        if (otherUser.id == currentUser.id) continue;

        const fullName = `${otherUser.name.first} ${otherUser.name.last}`;
        const textColor = otherUser.logged ? "#00f" : "#aaa";
        listUsers += `
            <p>
                <input type="checkbox" data-id="${otherUser.id}">
                <img src="${otherUser.picture.thumbnail}">
                <span style="color:${textColor}">${fullName}</span>
            </p>
        `;

        let completeAddress = otherUser.location.street.number + " " + otherUser.location.street.name + ", " + otherUser.location.city + ", " + otherUser.location.country;
        addMarkerUsers(completeAddress, otherUser)
    }

    userListContainer.innerHTML = listUsers;
}

async function addMarker(indirizzo, user) {
    let gpsUser = await myMapLibre.geocode(indirizzo)
        .catch(function (err) {
            console.log(`Geocoding fallito per ${user.name.first}: ${err}`);
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
            console.log(`Geocoding fallito per ${user.name.first}: ${err}`);
        });

    if (!gpsUser) return;

    const popupText =
        `
        <div class="popup-user">
            <p>${user.name.first} ${user.name.last}</p>
            <p>${indirizzo}</p>
        </div>
    `;

    myMapLibre.addMarker(gpsUser, userIcon, user.name.first + " " + user.name.last, popupText);
}



btnSendMessage.addEventListener("click", async () => {
    const message = txtMessage.value.trim();
    if (!message) {
        alert("Inserisci un messaggio prima di inviare.");
        return;
    }

    const selected = usersList.querySelectorAll("input[type='checkbox']:checked");
    if (selected.length == 0) {
        alert("Seleziona almeno un utente.");
        return;
    }

    for (let checkbox of selected) {
        const userId = checkbox.dataset.id;
        const response = await ajax.sendRequest("GET", `/users/${userId}`).catch(console.error);
        if (!response || !response.data) continue;
        const targetUser = response.data;
        const newMessages = Array.isArray(targetUser.messages) ? [...targetUser.messages, message] : [message];
        await ajax.sendRequest("PATCH", `/users/${userId}`, { messages: newMessages }).catch(console.error);
    }

    txtMessage.value = "";
    alert("Messaggio inviato ai partecipanti selezionati.");
});

saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    let canvas = mdlDiagram.querySelector("canvas");
    if (!canvas) return;
    myBarChart.setWhiteBackground(canvas);
    const imageURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = `chart-${userGlobal ? userGlobal.location.city : 'diagram'}.png`;
    link.click();
});

function random(min, max) {
    return Math.floor((max - min) * Math.random() + min)
}
