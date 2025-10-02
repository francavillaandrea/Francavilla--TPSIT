'use strict'

const listView = document.getElementById("list-view");
const divNbooks = listView.querySelector(".nBooks")
const tBody = listView.querySelector("tbody");

const detailsView = document.getElementById("details-view");
detailsView.style.display = "none"
const details = detailsView.querySelector(".details")
const pageLabel = detailsView.querySelector("span")

const addView = document.getElementById("add-view");
addView.style.display = "none"
const newBook = addView.querySelector(".details")

const btns = document.querySelectorAll(".headerBtn");
const btnElenco = btns[0];
const btnDettagli = btns[1];
const btnAggiungi = btns[2];
const btnSalva = btns[3];

btnElenco.classList.add("active");

let xmlBookstore = localStorage.getItem("bookstore");
if (!xmlBookstore) {
    xmlBookstore = bookstoreIniziale;
}
//COnvertiamo lòa stinga xmlBookstore in oggetto xml
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlBookstore, "text/xml");
const xmlRoot = xmlDoc.firstElementChild;

let category = "", id = "", title = "", language = "", autors = "", year = "", price = "";
visualizza();

function visualizza() {
    divNbooks.textContent = `Numero libri: ${xmlRoot.children.length}`
    for (let book of xmlRoot.children) {
        let row = document.createElement("tr")
        tBody.appendChild(row)
        readBook(book);


    }
}







