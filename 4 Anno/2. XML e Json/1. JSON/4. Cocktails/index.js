"use strict";

let headers = ["", "id", "name", "alcohlic", "main ingredient", ""]
let headersWidth = [40, 40, 60, 70, 70, 40]

const opts = document.querySelectorAll("input[type=radio]")
const optAlcoholic = document.getElementById("optAlcoholic")
const optNonAlcoholic = document.getElementById("optNonAlcoholic")
const optAll = document.getElementById("optAll")
const lstIngredients = document.getElementById("lstIngredients")
const table = document.getElementsByTagName("table")[0];
const details = document.getElementById("details")
const btnAdd = document.getElementsByTagName("button")[0];
let tbody = document.createElement("tbody");
let thead = document.createElement("thead");


//Data
let cocktailsVect = [];
let ingredientsVect = [];

let cocktailsJSON = JSON.parse(cocktails);
let ingredientsJSON = JSON.parse(ingredients);

//Events
opts.forEach(function (opt) {
    opt.addEventListener("click", selectionAlcoholic);
});
lstIngredients.addEventListener("change", selectionIngredient);
btnAdd.addEventListener("click", addNewDrink);

// Carica ingredienti e cocktail
for (let i = 0; i < ingredientsJSON.ingredients.length; i++) {
    ingredientsVect.push(ingredientsJSON.ingredients[i].strIngredient1);
}

for (let i = 0; i < cocktailsJSON.drinks.length; i++) {
    cocktailsVect.push(cocktailsJSON.drinks[i]);
}

//Functions
visualizeListbox();
visualizeCocktail("", "");

lstIngredients.value = "";


function visualizeListbox() {
    let optAll = document.createElement("option");
    optAll.value = "";
    optAll.textContent = "Tutti i cocktail";
    lstIngredients.appendChild(optAll);

    for (let i = 0; i < ingredientsVect.length; i++) {
        let optEl = document.createElement("option");
        optEl.value = ingredientsVect[i];
        optEl.textContent = ingredientsVect[i];
        lstIngredients.appendChild(optEl);
    }

    ingredientsVect.sort();

    for (let i = 0; i < opts.length; i++) {
        if (opts[i].value === "All") {
            opts[i].checked = true;
            break;
        }
    }

}

function visualizeCocktail(selectedOpt, selectedIng) {
    tbody.innerHTML = "";
    thead.innerHTML = "";
    table.appendChild(tbody);

    let tr = document.createElement("tr");
    tbody.appendChild(tr);

    for (let i = 0; i < headers.length; i++) {
        let td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = headers[i];
        td.style.width = `${headersWidth[i]}px`;
    }

    cocktailsVect.forEach(function (drink) {
        if ((drink.strAlcoholic == selectedOpt || !selectedOpt) && (!selectedIng || drink.strIngredient1 == selectedIng)) {
            tr = document.createElement("tr");
            tbody.appendChild(tr);

            let td = document.createElement("td");
            tr.appendChild(td);
            td.style.width = `${headersWidth[0]}px`;

            //Img
            let img = document.createElement("img");
            td.appendChild(img);
            img.src = `${drink.strDrinkThumb}`;
            img.style.width = `${headersWidth[0]}px`;

            //id
            td = document.createElement("td");
            tr.appendChild(td);
            td.textContent = drink.idDrink;
            td.style.width = `${headersWidth[1]}px`;

            //Name
            td = document.createElement("td");
            tr.appendChild(td);
            td.textContent = drink.strDrink;
            td.style.width = `${headersWidth[1]}px`;

            //Alcolico
            td = document.createElement("td");
            tr.appendChild(td);
            td.textContent = drink.strAlcoholic;
            td.style.width = `${headersWidth[3]}px`;

            //Ingrediente
            td = document.createElement("td");
            tr.appendChild(td);
            td.textContent = drink.strIngredient1;
            td.style.width = `${headersWidth[4]}px`;

            //Dettagli
            let span = document.createElement("span");
            td.appendChild(span);
            span.textContent = "dettagli";
            span.style.textDecoration = "underline";
            span.style.color = "blue";
            span.style.cursor = "pointer";
            span.addEventListener("click", showDetails);
        };

    });
}


function showDetails() {
    details.innerHTML = "";
    span = document.createElement("span");
    details.appendChild(span);
    span.textContent = drink.strDrink;

    let br = document.createElement("br");
    details.appendChild(br);
    br = document.createElement("br");
    details.appendChild(br);

    span = document.createElement("span");
    details.appendChild(span);
    let i = 1;
    span.textContent = `Ingredienti:`;
    while (drink[`strIngredient${i}`] != null) {
        span.textContent += " - " + drink[`strIngredient${i}`];
        i++;
    }

    br = document.createElement("br");
    details.appendChild(br);
    br = document.createElement("br");
    details.appendChild(br);

    img = document.createElement("img");
    details.appendChild(img);
    img.src = `${drink.strDrinkThumb}`;
    img.style.width = `140px`;
}


function selectionAlcoholic() {
    let lst;

    if (lstIngredients.selectedIndex != 0) {
        lst = lstIngredients.value;
    }
    else {
        lst = "";
    }

    if (optAlcoholic.checked) {
        visualizeCocktail("Alcoholic", lst);
    }
    else if (optNonAlcoholic.checked) {
        visualizeCocktail("Non alcoholic", lst);
    }
    else {
        visualizeCocktail("", lst);
    }
}

function selectionIngredient() {
    let opt;

    if (optAlcoholic.checked) {
        opt = "Alcoholic";
    }
    else if (optNonAlcoholic.checked) {
        opt = "Non alcoholic";
    }
    else {
        opt = "";
    }

    if (this.selectedIndex != 0) {
        visualizeCocktail(opt, this.value);
    }
    else {
        visualizeCocktail(opt, "");
    }

}

function addNewDrink() {
    location.href = "./inserisci.html";
}