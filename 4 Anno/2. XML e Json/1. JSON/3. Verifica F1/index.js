"use strict";

//Variables
let teams = JSON.parse(database);
let vectTeams = [];

//Pointers
const divPiloti = document.getElementById("divPiloti");
const divNazioni = document.getElementById("divNazioni");
const lstScuderie = document.getElementById("lstScuderie");
const tbody = divPiloti.querySelector("tbody");
const btnAll = divPiloti.querySelector("button");
const divDettagli = document.getElementById("divDettagli");
btnAll.addEventListener("click", visualizeAll);

//Functions
loadTeams();
loadNations();
loadPilots();
lstScuderie.addEventListener("change", chooseTeam);


function loadPilots(selectedTeam) {
    tbody.innerHTML = "";
    for (let key in teams) {
        if (!selectedTeam || key == selectedTeam) {
            let pilots = teams[key].piloti;
            pilots.forEach(function (pilot) {
                let tr = document.createElement("tr");
                tbody.appendChild(tr);

                let td = document.createElement("td");
                td.textContent = pilot.numero;
                tr.appendChild(td);

                td = document.createElement("td");
                let span = document.createElement("span");
                span.textContent = pilot.nome;
                span.style.textDecoration = "underline";
                span.style.fontStyle = "italic";
                span.style.cursor = "pointer";
                span.addEventListener("click", function() {
                    showPilotDetails(pilot.numero);
                });
                td.appendChild(span);
                tr.appendChild(td);

                td = document.createElement("td");
                td.textContent = pilot.nazione;
                tr.appendChild(td);

                td = document.createElement("td");
                td.textContent = key;
                tr.appendChild(td);

            });
        }

    }
}


function loadNations() {

    let set = new Set();
    for (let key in teams) {
        let pilots = teams[key].piloti;
        //let pilots = teams[key]["piloti"];
        pilots.forEach(function (pilot) {
            set.add(pilot.nazione);
        });

    }
    let vetNations = Array.from(set).sort();

    //Loads on the page all the nations
    vetNations.forEach(function (nation) {
        let chk = document.createElement("input");
        chk.type = "checkbox";
        chk.value = nation;
        divNazioni.appendChild(chk);

        let span = document.createElement("span");
        span.textContent = nation;
        divNazioni.appendChild(span);

        let br = document.createElement("br");
        divNazioni.appendChild(br);

        chk.addEventListener("change", chkNations);

    });
}

function loadTeams() {
    //load vectTeams
    for (let team in teams) {
        vectTeams.push(team);
    }
    //Sorts the array
    vectTeams.sort();

    //Loads listBox: lstTeams
    vectTeams.forEach(function (team) {
        let opt = document.createElement("option");
        opt.textContent = team;
        opt.value = team;
        lstScuderie.appendChild(opt);

    });
    //Per tutti i valori html che contengono id, Js gli assegna automaticamente un puntatore accessibile senza farne un ulteriore.
    lstScuderie.selectedIndex = -1;
}

// Manage Teams
function chooseTeam() {
    deselectCheckbox();
    loadPilots(this.value);
}

function deselectCheckbox() {
    let chks = divNazioni.querySelectorAll("input[type=checkbox]");
    chks.forEach(function (chk) {
        chk.checked = false;
    });
}

//Btn All
function visualizeAll() {
    deselectCheckbox();
    loadPilots();
}

//Checkbox Nations
function chkNations() {
    // Reset team selection when filtering by nations
    lstScuderie.selectedIndex = -1;

    // Get all checked nations
    let vetNations = [];
    let chks = divNazioni.querySelectorAll("input[type=checkbox]");
    chks.forEach(function (chk) {
        if (chk.checked) {
            vetNations.push(chk.value);
        }
    });

    // Clear the current table
    tbody.innerHTML = "";

    // If no nations selected, show all pilots
    if (vetNations.length === 0) {
        loadPilots();
        return;
    }

    // Filter and display pilots from selected nations
    for (let key in teams) {
        let pilots = teams[key].piloti;
        pilots.forEach(function (pilot) {
            if (vetNations.includes(pilot.nazione)) {
                let tr = document.createElement("tr");
                tbody.appendChild(tr);

                let td = document.createElement("td");
                td.textContent = pilot.numero;
                tr.appendChild(td);

                td = document.createElement("td");
                let span = document.createElement("span");
                span.textContent = pilot.nome;
                span.style.textDecoration = "underline";
                span.style.fontStyle = "italic";
                span.style.cursor = "pointer";
                span.addEventListener("click", function() {
                    showPilotDetails(pilot.numero);
                });
                td.appendChild(span);
                tr.appendChild(td);

                td = document.createElement("td");
                td.textContent = pilot.nazione;
                tr.appendChild(td);

                td = document.createElement("td");
                td.textContent = key;
                tr.appendChild(td);
            }
        });
    }
}

function showPilotDetails(pilotNumber) {
    // Find the pilot with the given number
    let selectedPilot;
    let selectedTeam;
    
    for (let team in teams) {
        let pilots = teams[team].piloti;
        for(let i = 0; i < pilots.length; i++) {
            if(pilots[i].numero == pilotNumber) {
                selectedPilot = pilots[i];
                selectedTeam = team;
                break;
            }
        }
        if(selectedPilot) break;
    }

    if (!selectedPilot) return;

    // Clear and show the details container
    divDettagli.innerHTML = "";
    divDettagli.style.display = "flex";

    // Create details container
    let detailsContainer = document.createElement("div");
    
    // Create and append image
    let img = document.createElement("img");
    img.alt = selectedPilot.nome;
    img.src = `./img/${selectedPilot.nome}.jpg`;
    divDettagli.appendChild(img);

    // Add pilot details
    let details = [
        { label: "Nome", value: selectedPilot.nome },
        { label: "Numero", value: selectedPilot.numero },
        { label: "Nazione", value: selectedPilot.nazione },
        { label: `Data di nascita`, value: selectedPilot.data_di_nascita },
        { label: `Scuderia`, value: selectedTeam },
        { label: `Motore`, value: teams[selectedTeam].motore },
        { label: `Pneumatici`, value: teams[selectedTeam].pneumatici }
    ];

    for(let i = 0; i < details.length; i++) {
        let p = document.createElement("p");
        let strong = document.createElement("strong");
        let text = document.createElement("span");
        strong.textContent = `${details[i].label}: `;
        text.textContent = details[i].value;
        p.appendChild(strong);
        p.appendChild(text);
        detailsContainer.appendChild(p);
    }

    divDettagli.appendChild(detailsContainer);
}