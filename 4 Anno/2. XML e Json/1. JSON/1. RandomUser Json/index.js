"use strict"

let currentPage = 0

//Pointers
const opts = document.querySelectorAll("#optWrapper input")
const table = document.querySelector("table")
const tbody = table.querySelector("tbody")
const btns = document.querySelectorAll("#buttons input")
const pageLabel = document.querySelector("#buttons p")
const details = document.getElementById("details")

//Taking values from the data file
let stringPeople = localStorage.getItem("people") 
if(!stringPeople){
    stringPeople = initialData;
}
const jsonPeople = JSON.parse(stringPeople)

//Splitting males and females in between 2 vectors
let males = [];
let females = [];

jsonPeople.forEach(function(person) {
    if(person.gender == "male"){
        males.push(person);
    }
    else{
        females.push(person);
    }
});

//Coping males inside people
let people = males;

//
displayData()

function displayData(){
    for(let i = currentPage*6; i < currentPage*6+6 && i < people.length; i++){
        let tr = document.createElement("tr")
        tbody.appendChild(tr)
        let td = document.createElement("td")
        tr.appendChild(td)
        td.textContent = people. 

    }
}
