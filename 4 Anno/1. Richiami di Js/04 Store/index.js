"use strict"

const content = document.getElementById("content")

const btnSearch = document.getElementById("btn-search");
btnSearch.addEventListener("click", showAlert);

loadProducts();
function showAlert() {

}

function loadProducts() {
    let h3 = document.createElement("h3")
    h3.textContent = `Numero di prodotti ${pc.length}`
    content.appendChild(h3);

    let row = document.createElement("div")
    row.classList.add("row")
    content.appendChild(row)

    for (let i = 0; i < pc.length; i++) {

        let product = pc[i]

        let cell = document.createElement("div")
        cell.classList.add("col-md-4")
        row.appendChild(cell)

        let card = document.createElement("div")
        card.classList.add("card")
        cell.appendChild(card)

        let img = document.createElement("img")
        img.classList.add("card-img-top")
        img.src = `./img/products/pc${product[0]}.jpg`
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
            cardText.textContent += `${product[j]} / `
        }
        cardBody.appendChild(cardText)

        let btn = document.createElement("a")
        btn.classList.add("btn", "btn-secondary")
        btn.textContent = "Compra"
        cardBody.appendChild(btn)
    
    }


}