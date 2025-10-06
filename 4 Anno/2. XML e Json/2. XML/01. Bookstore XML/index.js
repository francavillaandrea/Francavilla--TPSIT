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
//COnvertiamo la stinga xmlBookstore in oggetto xml
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlBookstore, "text/xml");
const xmlRoot = xmlDoc.firstElementChild;

let category = "", id = "", title = "", language = "", authors = "", year = "", price = "";
visualizza();

function readBook(book) {
    category = "", id = "", title = "", language = "", authors = "", year = "", price = "";

    if (book.hasAttribute("category")) {
        category = book.getAttribute("category")
    }
    id = book.firstElementChild.textContent;

    let titleNode = book.querySelector("title");
    title = titleNode.textContent;
    if (titleNode.hasAttribute("lang")) {
        language = titleNode.getAttribute("lang")
    }

    let yearNode = book.querySelector("year");
    if (yearNode) {
        year = yearNode.textContent;
    }

    price = book.lastElementChild.textContent;

    let authorsVet = book.querySelectorAll("author");
    authorsVet.forEach(function (author) {
        authors += author.textContent + "-"
    });
}

function visualizza() {
    divNbooks.textContent = `Numero libri: ${xmlRoot.children.length}`
    for (let book of xmlRoot.children) {
        let row = document.createElement("tr")
        tBody.appendChild(row)
        readBook(book);

        let td = document.createElement("td")
        row.appendChild(td)
        td.textContent = id;

        td = document.createElement("td")
        row.appendChild(td)
        td.textContent = title;

        td = document.createElement("td")
        row.appendChild(td)
        td.textContent = category;

        td = document.createElement("td")
        row.appendChild(td)
        td.textContent = language;

        td = document.createElement("td")
        row.appendChild(td)
        td.textContent = authors;

        td = document.createElement("td")
        row.appendChild(td)
        td.textContent = year;

        td = document.createElement("td")
        row.appendChild(td)
        td.textContent = price;

        td = document.createElement("td")
        row.appendChild(td)
        let btn = document.createElement("button");
        td.appendChild(btn)
        btn.textContent = "delete"
    }
}
btnDettagli.addEventListener("click", function () {
    for (let btn of btns) {
        btn.classList.remove("active");
    }
    btnDettagli.classList.add("active");

    listView.style.display = "none"
    detailsView.style.display = "block"
    loadDetails();

});
