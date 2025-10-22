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

if(!stringPeople)
{
    stringPeople = initialData;
}

const JSONPEOPLE = JSON.parse(stringPeople);

let males = [];
let females = [];

for(let aux of JSONPEOPLE)
{
    if(aux.gender == "male")
    {
        males.push(aux);
    }
    else
    {
        females.push(aux);
    }
}

let people = males;
    
DisplayData();

function DisplayData()
{
    for(let i = currentPage*6; i < currentPage*6+6 && i < people.length; i++)
    {
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
        td.textContent = `${people[i].location.city}`

        td = document.createElement("td");
        tr.append(td);
        td.textContent = `${people[i].location.state}`

        td = document.createElement("td");
        tr.append(td);
        td.textContent = `${people[i].nat}`
    }
}