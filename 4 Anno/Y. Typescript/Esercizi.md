# Corso Base di TypeScript: Esercizi e Guida

Questo documento raccoglie esercizi progressivi per imparare TypeScript partendo da basi di JavaScript.
Gli esercizi sono divisi per macro-argomenti e contengono sia le consegne che esempi di utilizzo.

## Installazione e compilazione di TypeScript

### Installazione

1. Installare Node.js dal sito ufficiale: https://nodejs.org/en

2. Installare TypeScript globalmente con npm:
    ```powershell
    npm install -g typescript
    ```
3. Verificare l'installazione:
    ```powershell
    tsc --version
    ```
### Compilazione di un progetto TypeScript

1. Creare un file index.ts con il codice TypeScript.

2. Compilare con:
    ```powershell
    npx tsc index.ts
    ```
    Questo genera index.js eseguibile con Node o utilizzabile in HTML:
    ```powershell
    node index.js
    ```

### Creare un progetto completo con tsconfig.json

1. Inizializza il progetto:
    ```powershell
    tsc --init
    ```

2. Configura le opzioni principali in tsconfig.json:
    ```json
    {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
    }
    ```

3. Compila l’intero progetto:
    ```powershell
    tsc
    ```
4. Esegui il codice compilato o con HTML:
    ```
    node dist/index.js
    ```

---

## 1. Tipi di base

### Esercizio 1: Variabili tipizzate
```ts
Crea le seguenti variabili con il tipo esplicito:
- age (number)
- username (string)
- isLogged (boolean)
- scores (array di numeri)
```
### Esercizio 2: Funzioni tipizzate
```ts
Crea una funzione sum che:
- accetta due numeri
- ritorna un numero
- genera errore se provi a passarle una stringa
```
### Esercizio 3: Tipizzazione con const e type inference
```ts
Prova a dichiarare const age = 10;
Che tipo assegna TypeScript? (number o literal 10?)
```
## 2. Oggetti e interfacce
### Esercizio 4: Oggetti tipizzati
```ts
Crea un oggetto User con:
id (number), name (string), email (string), isAdmin (boolean)

Tipizza prima inline, poi crea un type o interface User
```
### Esercizio 5: Type vs Interface
```ts
Crea un tipo Product con id, name, price
Crea una funzione che stampa:
"Prodotto: Nome - €Prezzo"
Prova sia con type che con interface
```
### Esercizio 6: Optional Properties
```ts
Crea un'interfaccia Car con brand, model, year, color opzionale
Crea due oggetti: uno con color, uno senza
```
### Esercizio 7: Funzioni su oggetti
```ts
Scrivi una funzione makeAdmin(user: User): User
Che restituisce una copia dell'utente con isAdmin = true
Non modificare l'oggetto originale
```
## 3. Tipi avanzati
### Esercizio 8: Union Types
```ts

Crea una funzione printId(id: number | string)
Stampa "ID numerico: valore" o "ID stringa: valore" usando typeof
```

### Esercizio 9: Literal Types
```ts

Crea una variabile role che può essere solo "admin" | "user" | "guest"
Verifica che assegnare un valore diverso dia errore
```

### Esercizio 10: Generics base
```ts

Crea una funzione generica identity<T>(value: T): T
Testala con numero, stringa e array
```
### Esercizio 11: Array di oggetti tipizzati
```ts
Crea un array di User
Scrivi una funzione che ritorna solo gli utenti admin
```
## 4. Async e API
### Esercizio 12: Async + TypeScript
```ts
Crea un'interfaccia Post {id:number, title:string, body:string}
Scrivi una funzione async che simula una fetch e ritorna Promise<Post[]>
```
### Esercizio 13: Async con error handling
```ts
Modifica la funzione precedente aggiungendo try/catch
Tipizza correttamente la Promise
```
## 5. Utility Types e avanzamenti
### Esercizio 14: Partial e Pick
```ts

Crea un type Product completo
Usa Partial<Product> per creare un oggetto opzionale
Usa Pick<Product, 'id' | 'name'> per creare un nuovo tipo
```
### Esercizio 15: Type Guards
```ts
Crea una funzione isString(x: unknown): x is string
Usa questa funzione per filtrare un array misto di numeri e stringhe
```
