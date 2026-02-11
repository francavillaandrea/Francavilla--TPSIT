// Esercizio 04 - Type Vs Interface
//Type
/*
type Product = {
    id: number,
    name: string,
    price: number
}
*/
//Inrterface
interface Product {
    id: number,
    name: string,
    price: number
}

const beer: Product = {
    id: 0,
    name: "beer",
    price: 10
}

printProduct(beer);

function printProduct(product: Product) {
    console.log(`Prodotto: ${product.name} - €${product.price}`)
}
