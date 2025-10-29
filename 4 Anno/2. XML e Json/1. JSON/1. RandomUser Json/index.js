"use strict"

const headersWidth = ["25%", "25%", "25%", "10%", "7.5%", "7.5%"];
let currentPage = 0;


const opts = document.querySelectorAll("#optWrapper input");
const table = document.querySelector("table");
const tbody = table.querySelector("tbody");
const btns = document.querySelectorAll("#buttons input");
const pageLabel = document.querySelector("#buttons p");
const details = document.getElementById("details");

//Prende people dal local storage se c'è altrimenti lo prende dal .js
let stringPeople = localStorage.getItem("initialData");

if (!stringPeople) {
    stringPeople = initialData;
}

const JSONPEOPLE = JSON.parse(stringPeople);

let males = [];
let females = [];

for (let aux of JSONPEOPLE) {
    if (aux.gender == "male") {
        males.push(aux);
    }
    else {
        females.push(aux);
    }
}

let people = males;

displayData();

function displayData() {

    tbody.innerHTML = ""
    for (let i = currentPage * 6; i < currentPage * 6 + 6 && i < people.length; i++) {
        let tr = document.createElement("tr");

        tbody.appendChild(tr);

        let td = document.createElement("td");
        tr.append(td);
        td.textContent = `${people[i].name.first} ${[people[i].name.last]}`

        td = document.createElement("td");
        tr.append(td);
        td.textContent = `${people[i].location.city}`

        td = document.createElement("td");
        tr.append(td);
        td.textContent = `${people[i].location.state}`

        td = document.createElement("td");
        tr.append(td);
        td.textContent = `${people[i].nat}`

        td = document.createElement("td");
        tr.append(td)
        td.style.backgroundImage = "url(./img/lente.jpg)"
        td.style.backgroundSize = "contain"
        td.style.backgroundRepeat = "no-repeat"
        td.style.padding = "5px"
        td.style.backgroundOrigin = "content-box";
        td.addEventListener("click", function () {
            showDetails(people[i])
        })

        td = document.createElement("td");
        tr.append(td)
        td.style.backgroundImage = "url(./img/delete.png)";
        td.style.backgroundSize = "contain";
        td.style.backgroundRepeat = "no-repeat"
        td.style.padding = "5px"
        td.style.backgroundOrigin = "content-box";
        td.addEventListener("click", function () {
            deletePerson(i)
        })


    }
}

//Cambio Genere
opts[0].addEventListener("click", changeGenre)
opts[1].addEventListener("click", changeGenre)


function changeGenre() {
    currentPage = 0;
    /*if (this.value == "male")
    {
        people = males;
    }
    else 
    {
        people = females;
    }
    */

    people = (this.value == "male") ? males : females;
    displayData();
    enableButtons();
}

//Dettagli

function showDetails(person) {
    let p = document.createElement("P")
    p.textContent = person.email;
    details.append(p)

    const img = document.createElement("img")
    img.src = person.picture.large
    details.append(img)

    p = document.createElement("P")
    p.textContent = person.cell;
    details.append(p)
}


//Navigazione

enableButtons()

function enableButtons() {
    if (currentPage == 0) {
        btns[1].disabled = true;
        btns[2].disabled = false;
    }
    else if (currentPage == lastPage()) {
        btns[1].disabled = false;
        btns[2].disabled = true;
    }
    else {
        btns[1].disabled = false;
        btns[2].disabled = false;
    }
    pageLabel.textContent = (currentPage + 1) + "/" + (lastPage() + 1)
}

function lastPage() {

    return parseInt((people.length - 1) / 6);
}

for (let btn of btns) {
    btn.addEventListener("click", navigate)
}

function navigate() {
    switch (this.value) {
        case "Primo":
            currentPage = 0;
            break;
        case "Indietro":
            currentPage--;
            break;
        case "Avanti":
            currentPage++;
            break;
        case "Ultimo":
            currentPage = lastPage();
            break;
        case "Elimina":
            deleteByNation()
            break;
        case "Ordina":
            sortByName();
            break;
    }
    displayData();
    enableButtons();
}


//Elimina

function deletePerson(index) {
    people.splice(index, 1)
    checkLast()
    displayData();
}

function checkLast() {
    if (currentPage * 6 >= people.length) {
        currentPage--;
        enableButtons();
    }
}

//Ordinamento

function sortByName() {
    people.sort(function (record1, record2) {
        let str1 = record1["name"]["first"].toUpperCase();
        let str2 = record2["name"]["first"].toUpperCase();
        if (str1 > str2) {
            return 1;

        }
        else {
            return -1;
        }
    });
    displayData();
}

//Elimina per nazione

function deleteByNation() {

}