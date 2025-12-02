"use strict";

let tbody = document.querySelector("tbody")
let button = document.querySelector("button")
button.addEventListener("click", fillTable)

function fillTable() {
    let params = { results: 20, gender: "male" };

    let promise = ajax.sendRequest("get", "/api", params);

    promise.catch(ajax.errore);
    promise.then((httpResponse) => {
        console.log(httpResponse);
        let people = httpResponse.data;
        tbody.innerHTML = "";
        people.results.forEach((person) => {
            let tr = document.createElement("tr");
            tbody.append(tr);
            //Name 
            let td = document.createElement("td");
            td.textContent = `${person.name.first} ${person.name.last}`
            tr.append(td)
        });
    });

}
