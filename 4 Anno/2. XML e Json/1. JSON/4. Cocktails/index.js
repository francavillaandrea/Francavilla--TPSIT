"use strict";

// Variables
let headers = ["", "id", "name", "alcohlic", "main ingredient", ""];
let headersWidth = [40, 40, 60, 70, 70, 40];
let cocktailsJson = JSON.parse(cocktails);
let ingredientsJson = JSON.parse(ingredients);
let tbody;

// Pointers
const optAlcohol = document.getElementById("optAlcoholic");
const optNonAlcohol = document.getElementById("optNonAlcoholic");
const optAll = document.getElementById("optTutti");
const lstIngredients = document.getElementById("lstIngredienti");
const table = document.getElementsByTagName("table")[0];
const details = document.getElementById("dettagli");

loadIngredients();
// Functions
function loadIngredients() {
  lstIngredients.innerHTML = "";
  ingredientsJson.strIngredient1.forEach(function(ingredient){
    let option = document.createElement("option");
    option.text = ingredient.name;
    lstIngredients.appendChild(option);

  });
}

