"use strict"

const navbarContent = document.getElementById("navbarContent");
const tbody = document.getElementsByTagName("tbody")[0];
const btnLogin = document.getElementById("btnLogin");
const btnClose = document.getElementsByClassName("btn-close")[2];
const btnAggiungi = document.querySelectorAll("button.btn-primary")[0]
const btnSalva = document.querySelector("button.btn-success");

caricaLibri()
function caricaLibri() {
    tbody.innerHTML = ""
    biblioteca.forEach(function (book) {
        let row = document.createElement("tr");
        tbody.appendChild(row);

        let id = document.createElement("td")
        id.textContent = `${book[0]}`
        row.appendChild(id)

        let title = document.createElement("td")
        title.textContent = `${book[1]}`
        row.appendChild(title)

        let author = document.createElement("td")
        author.textContent = `${book[2]}`
        row.appendChild(author)

        let genre = document.createElement("td")
        genre.textContent = `${book[4]}`
        row.appendChild(genre)

        let copies = document.createElement("td")
        let i = 0;
        if (book[6] >= 100_000_000) {
            for (; i < 5; i++) {
                let icon = document.createElement("i")
                icon.classList.add("bi", "bi-star-fill")
                copies.appendChild(icon)
            }
            for (; i < 5; i++) {
                let icon = document.createElement("i")
                icon.classList.add("bi", "bi-star")
                copies.appendChild(icon)
            }
        }
        else if (book[6] >= 60_000_000) {
            for (; i < 4; i++) {
                let icon = document.createElement("i")
                icon.classList.add("bi", "bi-star-fill")
                copies.appendChild(icon)
            }
            for (; i < 5; i++) {
                let icon = document.createElement("i")
                icon.classList.add("bi", "bi-star")
                copies.appendChild(icon)
            }
        }
        else if (book[6] > 30_000_000) {
            for (i = 0; i < 3; i++) {
                let icon = document.createElement("i")
                icon.classList.add("bi", "bi-star-fill")
                copies.appendChild(icon)
            }
            for (; i < 5; i++) {
                let icon = document.createElement("i")
                icon.classList.add("bi", "bi-star")
                copies.appendChild(icon)
            }
        }
        else if (book[6] >= 1_000_000) {
            for (; i < 2; i++) {
                let icon = document.createElement("i")
                icon.classList.add("bi", "bi-star-fill")
                copies.appendChild(icon)
            }
            for (; i < 5; i++) {
                let icon = document.createElement("i")
                icon.classList.add("bi", "bi-star")
                copies.appendChild(icon)
            }
        }
        else {
            for (; i < 1; i++) {
                let icon = document.createElement("a")
                icon.classList.add("bi", "bi-star-fill")
                copies.appendChild(icon)
            }
            for (; i < 5; i++) {
                let icon = document.createElement("i")
                icon.classList.add("bi", "bi-star")
                copies.appendChild(icon)
            }
        }
        row.appendChild(copies)

        let search = document.createElement("td")
        search.classList.add("bi", "bi-search")
        let modalBody = document.getElementsByClassName("modal-body")[0];
        search.addEventListener("click", function () {
            const modal = new bootstrap.Modal("#modal-details")
            modal.show()
            modalBody.textContent = ""

            let container = document.createElement("div")
            container.classList.add("card", "shadow", "p-3")
            modalBody.appendChild(container)
            let h2 = document.createElement("h2")
            h2.classList.add("card-title", "text-center", "mb-3")
            container.appendChild(h2)
            let img = document.createElement("img")
            img.src = `img/${book[7]}`
            img.classList.add("mx-auto", "d-block", "mb-3", "w-50");
            container.appendChild(img)
            let div = document.createElement("div")
            container.appendChild(div)

            let row = document.createElement("div")
            row.classList.add("row", "mb-2")
            div.appendChild(row)
            let id = document.createElement("div")
            id.classList.add("col-4", "fw-bold", "text-end")
            id.textContent = "id"
            row.appendChild(id)
            let col = document.createElement("div")
            col.classList.add("col-8")
            row.appendChild(col)
            let textBox = document.createElement("input")
            textBox.type = "text"
            textBox.classList.add("form-control")
            textBox.readOnly = true;
            textBox.value = book[0]
            col.appendChild(textBox);

            let row2 = document.createElement("div")
            row2.classList.add("row", "mb-2")
            div.appendChild(row2)
            let Autore = document.createElement("div")
            Autore.classList.add("col-4", "fw-bold", "text-end")
            Autore.textContent = "Autore"
            row2.appendChild(Autore)
            let col2 = document.createElement("div")
            col2.classList.add("col-8")
            row2.appendChild(col2);
            let textBox2 = document.createElement("input")
            textBox2.type = "text"
            textBox2.classList.add("form-control")
            textBox2.readOnly = true
            textBox2.value = book[2]
            col2.appendChild(textBox2);

            let row3 = document.createElement("div")
            row3.classList.add("row", "mb-2")
            div.appendChild(row3)
            let Anno = document.createElement("div")
            Anno.classList.add("col-4", "fw-bold", "text-end")
            Anno.textContent = "Anno"
            row2.appendChild(Anno)
            let col3 = document.createElement("div")
            col3.classList.add("col-8")
            row2.appendChild(col3);
            let textBox3 = document.createElement("input")
            textBox3.type = "text"
            textBox3.classList.add("form-control")
            textBox3.readOnly = true
            textBox3.value = book[3]
            col3.appendChild(textBox3);

            let row4 = document.createElement("div")
            row4.classList.add("row", "mb-2")
            div.appendChild(row4)
            let Genere = document.createElement("div")
            Genere.classList.add("col-4", "fw-bold", "text-end")
            Genere.textContent = "Genere"
            row2.appendChild(Genere)
            let col4 = document.createElement("div")
            col4.classList.add("col-8")
            row2.appendChild(col4);
            let textBox4 = document.createElement("input")
            textBox4.type = "text"
            textBox4.classList.add("form-control")
            textBox4.readOnly = true
            textBox4.value = book[4]
            col4.appendChild(textBox4);

            let row5 = document.createElement("div")
            row5.classList.add("row", "mb-2")
            div.appendChild(row5)
            let Pagine = document.createElement("div")
            Pagine.classList.add("col-4", "fw-bold", "text-end")
            Pagine.textContent = "Pagine"
            row2.appendChild(Pagine)
            let col5 = document.createElement("div")
            col5.classList.add("col-8")
            row2.appendChild(col5);
            let textBox5 = document.createElement("input")
            textBox5.type = "text"
            textBox5.classList.add("form-control")
            textBox5.readOnly = true
            textBox5.value = book[5]
            col5.appendChild(textBox5);

            let row6 = document.createElement("div")
            row6.classList.add("row", "mb-2")
            div.appendChild(row6)
            let CopieVendute = document.createElement("div")
            CopieVendute.classList.add("col-4", "fw-bold", "text-end")
            CopieVendute.textContent = "Copie Vendute"
            row2.appendChild(CopieVendute)
            let col6 = document.createElement("div")
            col6.classList.add("col-8")
            row2.appendChild(col6);
            let textBox6 = document.createElement("input")
            textBox6.type = "text"
            textBox6.classList.add("form-control")
            textBox6.readOnly = true
            textBox6.value = book[6]
            col6.appendChild(textBox6);

        })
        row.appendChild(search)

        let trash = document.createElement("td")
        trash.classList.add("bi", "bi-trash")
        row.appendChild(trash)
    });
}


btnSalva.addEventListener("click", function () {
    const modal = new bootstrap.Modal("#modal-add-newbook")
    const modalBody = document.querySelectorAll("div.modal-body")[1]
    const id = modalBody.querySelectorAll("input[type=text]")[0]
    const title = modalBody.querySelectorAll("input[type=text]")[1]
    const author = modalBody.querySelectorAll("input[type=text]")[2]
    const year = modalBody.querySelectorAll("input[type=text]")[3]
    const genre = modalBody.querySelectorAll("input[type=text]")[4]
    const pages = modalBody.querySelectorAll("input[type=text]")[5]
    const copies = modalBody.querySelectorAll("input[type=text]")[6]
    const picture = modalBody.querySelectorAll("input[type=text]")[7]


    let row = document.createElement("tr");
    tbody.appendChild(row);

    let idText = document.createElement("td")
    idText.textContent = `${id.textContent}`
    row.appendChild(idText)

    let titleText = document.createElement("td")
    titleText.textContent = `${title.textContent}`
    row.appendChild(titleText)

    let authorText = document.createElement("td")
    authorText.textContent = `${author.textContent}`
    row.appendChild(authorText)

    let genreText = document.createElement("td")
    genreText.textContent = `${genre.textContent}`
    row.appendChild(genreText)

    let copiesText = document.createElement("td")
    copiesText.textContent = `${copies.textContent}`
    row.appendChild(copiesText)

    modal.hide()


})

btnAggiungi.addEventListener("click", function () {
    const modal = new bootstrap.Modal("#modal-add-newbook")
    modal.show()
})

btnLogin.addEventListener("click", function () {
    let alert = document.getElementById("alert-login")
    alert.classList.remove("d-none")
});

btnClose.addEventListener("click", function () {
    let alert = document.getElementById("alert-login")
    alert.classList.add("d-none")
});


