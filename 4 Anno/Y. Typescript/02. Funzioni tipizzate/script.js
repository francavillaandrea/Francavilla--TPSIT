// ============================
// ESERCIZIO 2 - FUNZIONI TIPIZZATE
// ============================
// Crea una funzione chiamata sum che:
// - accetta due parametri numerici
// - ritorna un numero
// - deve generare errore se viene passata una stringa
// Esempi di utilizzo:
// sum(4, 5)      // ok
// sum("4", 5)    // errore
console.log(sum(5, 6));
//console.log(sum(5, "6")); questa riga da errore perchè la funzione sum() accetta come parametro solo un valore numerico
function sum(n1, n2) {
    return n1 + n2;
}
