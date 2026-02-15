var beer = {
    id: 0,
    name: "beer",
    price: 10
};
printProduct(beer);
function printProduct(product) {
    console.log("Prodotto: ".concat(product.name, " - \u20AC").concat(product.price));
}
