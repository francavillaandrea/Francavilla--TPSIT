"use strict"

const table = document.querySelector("table");
let tbody = document.querySelector("tbody");
let thead = document.querySelector("thead");
let headers = ["name", "username", "state", "nat", "img"]

detailsWrapper.style.display = "none";

//Prende item da localStorage
let strPeople = localStorage.getItem("peopleJSON");
if (!strPeople) {
    strPeople = data;
}

//File Json parsificato e messa in un vettore
let peopleJSON = JSON.parse(strPeople);
//console.log(peopleJSON)
let peopleVect = [];
for (let i = 0; i < peopleJSON.results.length; i++) {
    peopleVect.push(peopleJSON.results[i]);
}
lstNations.selectedIndex = 0;



//Popolazione Listbox
visualizeListbox();
visualizeTable()

lstNations.addEventListener("change", selectionNation);


function selectionNation() {
    let lst;

    if (lstNations.selectedIndex != 0) {
        lst = lstNations.value;
        buttonsWrapper.style.display = "none";
    }
    else {
        lst = "";
        buttonsWrapper.style.display = "block";

    }
    visualizeTable(lst)

}



function visualizeTable(selectedNation) {
    tbody.innerHTML = "";
    thead.innerHTML = "";

    let tr = document.createElement("tr");
    thead.appendChild(tr);

    for (let i = 0; i < headers.length; i++) {
        let td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = headers[i];
    }

    let i = 0;
    peopleVect.forEach(function (person) {
        if (peopleVect["nat"] == selectedNation || !selectedNation) {
            if (i >= 5) {
                return;
            }
            else {

                tr = document.createElement("tr");
                tr.value = person;
                tbody.appendChild(tr);

                tr.addEventListener("click", function () {
                    showDetails(this.value);
                })

                //Name
                let td = document.createElement("td");
                tr.appendChild(td);
                td.textContent = person["name"].first + " " + person["name"].last;

                //Username
                td = document.createElement("td");
                tr.appendChild(td);
                td.textContent = person["login"].username;

                //state
                td = document.createElement("td");
                tr.appendChild(td);
                td.textContent = person["location"].state;

                //Nat
                td = document.createElement("td");
                tr.appendChild(td);
                td.textContent = person["nat"];

                //img
                let img = document.createElement("img");
                tr.appendChild(img);
                img.src = person["picture"].large;
                i++;
            }

        }
    });
}



function showDetails(selectedPerson) {
    detailsWrapper.style.display = "block";
    detailsWrapper.innerHTML = "";

    //img
    let img = document.createElement("img");
    detailsWrapper.appendChild(img);
    img.src = selectedPerson["picture"].large;

    //Name
    let p = document.createElement("p");
    detailsWrapper.appendChild(p);
    p.textContent = selectedPerson["name"].first + " " + selectedPerson["name"].last;

    //Mail
    p = document.createElement("a");
    detailsWrapper.appendChild(p);
    p.textContent = selectedPerson["email"];
    callbackBr()
    //Phone
    let span = document.createElement("span");
    detailsWrapper.appendChild(span);
    span.textContent = "phone:"

    let txt = document.createElement("input");
    txt.type = "text"
    txt.readOnly = true;
    txt.value = selectedPerson["phone"]
    detailsWrapper.appendChild(txt);
    callbackBr()
    //Cell
    span = document.createElement("span");
    detailsWrapper.appendChild(span);
    span.textContent = "cell:"

    txt = document.createElement("input");
    txt.type = "text"
    txt.readOnly = true;
    txt.value = selectedPerson["cell"];
    detailsWrapper.appendChild(txt);

    callbackBr();

    //Btn Save
    let btn = document.createElement("button");
    detailsWrapper.appendChild(btn);
    btn.textContent = "salva";


    //Btn delete
    btn = document.createElement("button");
    detailsWrapper.appendChild(btn);
    btn.textContent = "elimina";


}

function callbackBr() {
    let br = document.createElement("tr");
    detailsWrapper.appendChild(br)
}
function visualizeListbox() {
    let nation = peopleJSON.results;
    for (let nations in peopleVect) {
        let nat = nation[nations].nat;
        let opt = document.createElement("option");
        opt.value = nat;
        opt.textContent = nat;
        lstNations.append(opt);
    }
}



