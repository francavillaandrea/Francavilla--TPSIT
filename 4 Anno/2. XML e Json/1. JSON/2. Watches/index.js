"use strict";

const table = document.getElementsByTagName("table")[0]
const tbody = table.querySelector("tbody")

const gender = document.querySelector(".gender")
const lstGender = gender.querySelector("select")

const btnInsert = document.getElementsByClassName("inserisci")[0]

let strWatches = localStorage.getItem("watches");
if (!strWatches) {
    strWatches = initialData;
}
let watches = JSON.parse(strWatches);
visualize("All");

function visualize(selectedGender) {
    tbody.innerHTML = ""
    for (let watchGender of watches) {
        let gender = watchGender.gender;
        if (gender == selectedGender || selectedGender == "All") {
            for (let watchModel of watchGender.models) {
                let code = watchModel.code;
                let price = watchModel.price;

                for (let watch of watchModel.watches) {
                    let tr = document.createElement("tr");
                    tbody.appendChild(tr);

                    let td = document.createElement("td");
                    td.textContent = gender;
                    tr.appendChild(td);

                    td = document.createElement("td")
                    td.textContent = code;
                    tr.appendChild(td);

                    td = document.createElement("td")
                    td.textContent = price;
                    tr.appendChild(td);

                    td = document.createElement("td")
                    td.textContent = watch.color;
                    tr.appendChild(td);

                    td = document.createElement("td")
                    td.innerHTML = `<img src="./img/${watch.image}">`;
                    tr.appendChild(td);
                }
            }
        }
    }

}

//Gestione Generi

lstGender.addEventListener("change", function () {
    let gender = this.value;
    visualize(gender)
});


//Inserimento nuovo orologio
btnInsert.addEventListener("click", function()
{
    location.href = "./inserisci.html"
    //Modo per aprire un altro file HTML (valore _blank come default)
    //window.open("./inserisci.html", "_self")
})