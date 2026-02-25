"use strict";

const chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const chkAll = filters.querySelector("input[type=checkbox]")
const lstAuthors = filters.querySelectorAll("select")[0]
const lstLanguages = filters.querySelectorAll("select")[1]
let params = {};
let selectedBooks = [];
let currentFilter = {};
getAuthors();
getLanguages();
getBooks()

async function getAuthors() {
    let httpResponse = await ajax.sendRequest("GET", "/authors").catch(console.error);
    if (!httpResponse) return;

    let authors = httpResponse.data;

    authors.sort((a, b) => b.booksNumber - a.booksNumber);

    lstAuthors.innerHTML = "";

    let optDefault = document.createElement("option");
    optDefault.textContent = "";
    lstAuthors.selectedIndex = 0;
    lstAuthors.appendChild(optDefault)
    for (let author of authors) {
        let opt = document.createElement("option")
        opt.textContent = author.author;
        lstAuthors.appendChild(opt);
    }


    lstAuthors.addEventListener("change", async function () {
        lstLanguages.selectedIndex = 0;
        chkAll.checked = false;

        if (this.value == "") return getBooks();

        currentFilter = { author: this.value };
        getBooks(currentFilter);
    });
}

async function getLanguages() {
    let httpResponse = await ajax.sendRequest("GET", "/languages").catch(console.error);
    if (!httpResponse) return;

    let languages = httpResponse.data;

    languages.sort((a, b) => b.booksNumber - a.booksNumber); //Sbagliato

    lstLanguages.innerHTML = "";
    let optDefault = document.createElement("option");
    optDefault.textContent = "";
    optDefault.selectedIndex = 0;
    lstLanguages.appendChild(optDefault)

    for (let language of languages) {
        let opt = document.createElement("option")
        opt.textContent = language.languages;
        lstLanguages.appendChild(opt);
    }

    lstLanguages.addEventListener("change", async function () {
        lstAuthors.selectedIndex = 0;
        chkAll.checked = false;

        if (this.value == "") return getBooks();

        currentFilter = { language: this.value };
        getBooks(currentFilter);
    });
}

async function getBooks(params = {}) {
    currentFilter = params;
    selectedBooks = [];
    mainWrapper.innerHTML = "";

    let httpResponse = await ajax.sendRequest("GET", "/books", params).catch(console.error);
    if (!httpResponse) return;

    let books = httpResponse.data;

    books.forEach(book => {
        let chk = document.createElement("input");
        chk.type = "checkbox";
        chk.dataset.id = book.id;

        chk.addEventListener("change", function () {
            if (this.checked) {
                if (selectedBooks.length >= 3) {
                    alert("Puoi selezionare massimo 3 libri");
                    this.checked = false;
                    return;
                }
                selectedBooks.push(book);
            } else {
                selectedBooks = selectedBooks.filter(b => b.id !== book.id); //!== Contolla non solo value ma anche il tipo --> controlla se il libro selezionato ha lo stesso id di uno dei 
            }
        });

        mainWrapper.appendChild(chk);

        let span = document.createElement("span");
        span.textContent = `${book.author} - ${book.title} - ${book.score}`;
        span.style.cursor = "pointer";

        span.addEventListener("click", function () {
            getDetails(book.id);
        });

        mainWrapper.appendChild(span);
        mainWrapper.appendChild(document.createElement("br"));
    });

    let btn = document.createElement("button");
    btn.textContent = "INVIA";
    btn.addEventListener("click", sendVote);
    mainWrapper.appendChild(btn);
}

async function getDetails(id) {
    dettagli.innerHTML = "";

    let httpResponse = await ajax.sendRequest("GET", `/books/${id}`).catch(console.error);
    if (!httpResponse) return;

    let book = httpResponse.data;
    let p = document.createElement("p");
    p.innerHTML = `author: <strong>${book.author}</strong>`;
    dettagli.append(p);

    p = document.createElement("p");
    p.innerHTML = `country: <strong>${book.country}</strong>`;
    dettagli.append(p);
    p = document.createElement("p");
    p.innerHTML = `imageLink: <img src=${book.imageLink}></img>`;
    dettagli.append(p);
    p = document.createElement("p");
    p.innerHTML = `language: <strong>${book.language}</strong>`;
    dettagli.append(p);
    p = document.createElement("p");
    p.innerHTML = `link: <strong>${book.link}</strong>`;
    dettagli.append(p);
    p = document.createElement("p");
    p.innerHTML = `pages: <strong>${book.pages}</strong>`;
    dettagli.append(p);
    p = document.createElement("p");
    p.innerHTML = `title: <strong>${book.title}</strong>`;
    dettagli.append(p);
    p = document.createElement("p");
    p.innerHTML = `year: <strong>${book.year}</strong>`;
    dettagli.append(p);
    p = document.createElement("p");
    p.innerHTML = `score: <strong>${book.score}</strong>`;
    dettagli.append(p);
    p = document.createElement("p");
    p.innerHTML = `id: <strong>${book.id}</strong>`;
    dettagli.append(p);

    chkAll.addEventListener("click", function () {
        lstAuthors.selectedIndex = 0;
        lstLanguages.selectedIndex = 0;
        currentFilter = {};
        getBooks();
    });
}

async function sendVote() {
    if (selectedBooks.length == 0) {
        alert("Seleziona almeno un libro");
        return;
    }

    if (selectedBooks.length > 3) {
        alert("Puoi votare massimo 3 libri");
        return;
    }

    for (let book of selectedBooks) {
        await ajax.sendRequest("PATCH", `/books/${book.id}`, {
            score: book.score + 1
        });
    }

    getBooks(currentFilter);
}

function generateID() {
    let id = "";
    for (let i = 0; i < 4; i++) {
        id += chars[random(0, chars.length)];
    }
    return id;
}

btnAdd.addEventListener("click", async function () {

    if (lstAuthors.value == "") {
        alert("Seleziona un autore prima di inserire un libro");
        return;
    }

    let title = txtTitle.value.trim();
    let language = txtLanguage.value.trim();

    if (title == "" || language == "") {
        alert("Compila tutti i campi");
        return;
    }

    let newBook = {
        author: lstAuthors.value,
        title: title,
        language: language,
        imageLink: `images/${title}.jpg`,
        link: "",
        score: 0,
        pages: "",
        id: generateID()
    };

    await ajax.sendRequest("POST", "/books", newBook);

    let httpResponse = await ajax.sendRequest("GET", "/authors", { author: lstAuthors.value });
    let author = httpResponse.data[0];

    await ajax.sendRequest("PATCH", `/authors/${author.id}`, {
        booksNumber: author.booksNumber + 1
    });

    getBooks(currentFilter);
});


function random(a, b) {
    return Math.floor((b - a) * Math.random()) + a
}
