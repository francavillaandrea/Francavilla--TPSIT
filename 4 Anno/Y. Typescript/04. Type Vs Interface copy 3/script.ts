// ============================
// ESERCIZIO 4 - TYPE VS INTERFACE
// ============================

// Definisci un tipo Product con:
// - id (number)
// - name (string)
// - price (number)

// Crea una funzione che accetta un Product
// e stampa:
// "Prodotto: Nome - €Prezzo"

// Prova a farlo sia con type che con interface.

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
    id:number,
    name:string,
    price:number
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


/*
===============================
TYPE vs INTERFACE in TypeScript
===============================

Type
- 'type' crea un alias di tipo, può rappresentare oggetti, unione di tipi (union), intersezioni (intersection), tuple, primitive ecc.
- Non può essere "riaperto" per aggiungere proprietà extra dopo la dichiarazione.
- Esempio:
    type ProductType = { id: number; name: string; price: number };
    type Id = number | string; // union
    type Pair = [number, number]; // tuple

Interface
- 'interface' definisce la struttura di un oggetto.
- Può essere estesa con `extends` oppure "riaperta" per aggiungere nuove proprietà.
- Ideale per oggetti complessi o classi.
- Esempio:
    interface Product {
        id: number;
        name: string;
        price: number;
    }
    interface ExtendedProduct extends Product {
        stock: number;
    }

Quando usare cosa:
- Usa interface per oggetti che devono essere estesi o che rappresentano entità di un’app (più leggibile in librerie).
- Usa type per alias generici, union, tuple, primitive o combinazioni complesse.

In sintesi: interface = oggetti / estensioni, type = alias flessibili e composizioni.
*/
