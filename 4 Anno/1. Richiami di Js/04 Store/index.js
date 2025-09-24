"use strict"

const content = document.getElementById("content");
const btnSearch = document.getElementById("btn-search");
const alertSearch = document.getElementById("alert-search");
const categories = document.querySelectorAll("a.dropdown-item");
btnSearch.addEventListener("click", showAlert);


for (let category of categories) {
    category.addEventListener("click", function () {
        for(let item of categories)
        {
            item.classList.remove("active")
        }
        this.classList.add("active")
        switch(category.textContent)
        {
            case "PC":
                loadProducts(pc,pc_header,"pc")
                break;
            case "Telefoni":
                loadProducts(telefoni,telefoni_header,"telefoni")
                break;
            case "Tv":
                loadProducts(tv,tv_header,"tv")
                break;
             case "Audio Player":
                loadProducts(player,player_header,"player")
                break;
        }
    });
}
loadProducts(pc,pc_header,"pc");
function showAlert() {
    alertSearch.classList.remove("d-none")
}

function loadProducts(data, headers, path) {
    content.innerHTML = ""
    let h3 = document.createElement("h3")
    h3.textContent = `Numero di prodotti ${data.length}`
    content.appendChild(h3);

    let row = document.createElement("div")
    row.classList.add("row")
    content.appendChild(row)

    for (let i = 0; i < data.length; i++) {

        let product = data[i]

        let cell = document.createElement("div")
        cell.classList.add("col-md-4")
        row.appendChild(cell)

        let card = document.createElement("div")
        card.classList.add("card")
        cell.appendChild(card)

        let img = document.createElement("img")
        img.classList.add("card-img-top")
        img.src = `./img/${path}/img${product[0]}.jpg`
        card.appendChild(img)

        let cardBody = document.createElement("div")
        card.appendChild(cardBody)

        let h5 = document.createElement("h5")
        h5.textContent = `${product[1]}`
        cardBody.appendChild(h5)

        let cardText = document.createElement("p")
        cardText.classList.add("card-text")
        cardText.textContent = ""
        for (let j = 2; j < product.length; j++) {
            cardText.innerHTML += `${headers[j]}: ${product[j]} <br\> `
        }
        cardBody.appendChild(cardText)

        let btn = document.createElement("a")
        btn.classList.add("btn", "btn-secondary")
        btn.textContent = "Compra"
        btn.addEventListener("click", function () {
            const modal = new bootstrap.Modal("#buy-modal")
            modal.show();
        })
        cardBody.appendChild(btn)
    }


}

