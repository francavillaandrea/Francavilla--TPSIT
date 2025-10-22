'use strict'
//List View
const listView = document.getElementById("list-view");
const divNbooks = listView.querySelector(".nBooks")
const tBody = listView.querySelector("tbody");

const btnsList = document.querySelectorAll(".headerBtn");
const btnList = btnsList[0];
const btnDetails = btnsList[1];
const btnAdd = btnsList[2];
const btnsSave = btnsList[3];

//Details View
const detailsView = document.getElementById("details-view");
detailsView.style.display = "none"
const details = detailsView.querySelector(".details")
const pageLabel = detailsView.querySelector("span")

const btnsView = detailsView.querySelectorAll(".button");
const btnFirst = btnsView[0]
const btnBack = btnsView[1]
const btnNext = btnsView[2]
const btnLast = btnsView[3]
const btnDeleteDetails = btnsView[4]
const spanIndex = detailsView.getElementsByTagName("span")[0]

btnNext.addEventListener("click", nextDetails)
btnBack.addEventListener("click", backDetails)
btnFirst.addEventListener("click", firstDetails)
btnLast.addEventListener("click", lastDetails)
btnDeleteDetails.addEventListener("click", deleteDetails)

//Add View
const addView = document.getElementById("add-view");
addView.style.display = "none"
const newBook = addView.querySelector(".details")

//Prende il file di dati dal localStorage e mette active la pagina ListView
btnList.classList.add("active");
let xmlBookstore = localStorage.getItem("bookstore");
if (!xmlBookstore) {
    xmlBookstore = bookstoreIniziale;
}
//Convertiamo la stinga xmlBookstore in oggetto xml
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlBookstore, "text/xml");
const xmlRoot = xmlDoc.firstElementChild;

//Dichiariamo le variabili di appoggio per visualizza()
let category = "", id = "", title = "", language = "", authors = "", year = "", price = "";
visualizza();

//Legge i libri dal file di dati e inserisce i dati nelle variabili
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

//Mostra i dati nella vista listView
function visualizza() {
    tBody.innerHTML = ""
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
        let btnDelete = document.createElement("button");
        td.appendChild(btnDelete)
        btnDelete.textContent = "delete"
        btnDelete.addEventListener("click", Delete);
    }
}

//Gestice il pulsante cancella della listView e cancella la riga selezionata
function Delete(){
    xmlRoot.children[currentBookIndex].remove()
    loadDetails()
}

//Gestione pagina detailsView
let currentBookIndex = 0;
btnDetails.addEventListener("click", showDetails)

//Porta alla pagina detailsView
function showDetails(){
    for (let btn of btnsList) {
        btn.classList.remove("active");
    }
    btnDetails.classList.add("active");

    listView.style.display = "none";
    detailsView.style.display = "block";
    loadDetails();
}

//Visualizza le informazioni nella pagina detailsView
function loadDetails() {
    details.innerHTML = ""
    
    let book = xmlRoot.children[currentBookIndex]
    let label, p;
    readBook(book)

    createRow(label, p, `id: ${id}`)
    createRow(label, p, `title: ${title}`)
    createRow(label, p, `category: ${category}`)
    createRow(label, p, `language: ${language}`)
    createRow(label, p, `authors: ${authors}`)
    createRow(label, p, `year: ${year}`)
    createRow(label, p, `price: ${price}`)
}

//Crea la riga della pagina detailsView
function createRow(label, p, data) {
    let dataSplitted = data.split(": ")

    label = document.createElement("label");
    label.innerHTML = dataSplitted[0];
    details.appendChild(label)

    p = document.createElement("p")
    p.innerHTML = dataSplitted[1];
    details.appendChild(p)
}


//Gestiamo il pulsante next nella pagina detailsView
function nextDetails(){
    if(currentBookIndex == xmlRoot.children.length-1)
    {
        currentBookIndex = 0
    }
    else 
    {
        currentBookIndex++;
    }
    loadDetails()
}

function backDetails(){
if(currentBookIndex == 0)
    {
        currentBookIndex = xmlRoot.children.length-1;
    }
    else 
    {
        currentBookIndex--;
    }
    loadDetails()
    spanIndex.textContent = `${currentBookIndex}/${xmlRoot.children.length+1}`

}

function firstDetails(){
    currentBookIndex = 0;

    btnBack.disabled = true;
    btnFirst.disabled = true;
    btnLast.disabled = false
    btnNext.disabled = false
    btnDeleteDetails.disabled = false

    spanIndex.textContent = `${currentBookIndex+1}/${xmlRoot.children.length}`
    loadDetails()

}

function lastDetails(){
currentBookIndex = xmlRoot.children.length-1;
    btnBack.disabled = false;
    btnFirst.disabled = false;
    btnLast.disabled = true
    btnNext.disabled = true
    btnDeleteDetails.disabled = false
    spanIndex.textContent = `${xmlRoot.children.length}/${currentBookIndex+1}`
    loadDetails()

}

function deleteDetails()
{
    xmlRoot.children[currentBookIndex].remove()
    loadDetails()
}
