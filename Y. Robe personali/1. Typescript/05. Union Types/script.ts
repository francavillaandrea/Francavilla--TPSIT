// Esercizio 05 - Union Types
// 1️⃣ Crea una funzione chiamata printId che:
// - accetta un parametro id che può essere:
//   - un number
//   - una string
// - NON deve accettare altri tipi
// - usa il controllo typeof per distinguere i due casi

// 2️⃣ Se id è un numero:
//    stampa: "ID numerico: valore"

// 3️⃣ Se id è una stringa:
//    stampa: "ID stringa: valore"

// 4️⃣ Prova questi casi:
// printId(123)        // ok
// printId("abc123")   // ok
// printId(true)       // deve dare errore TypeScript

// --------------------------------------
// BONUS 1:
// Modifica la funzione in modo che:
// - se id è una stringa, venga convertita in maiuscolo prima di stamparla

// --------------------------------------
// BONUS 2 (più avanzato):
// Crea una funzione formatValue che accetta:
// - number | string | boolean
// e ritorna SEMPRE una stringa formattata in modo diverso
// in base al tipo ricevuto.
