# Guida a TypeScript: Concetti Fondamentali

## 1. Cos’è TypeScript

TypeScript è un superset di JavaScript che aggiunge **tipizzazione statica** opzionale al linguaggio. Tutti i file TypeScript hanno estensione `.ts` e possono essere compilati in JavaScript tramite il compilatore `tsc`.

La tipizzazione aiuta a:

* Ridurre errori a runtime.
* Fornire auto-completamento e intellisense negli IDE.
* Documentare meglio il codice.

---

## 2. Tipi di base

TypeScript supporta i tipi primitivi di JavaScript più alcuni tipi avanzati:

```ts
let isDone: boolean = true;
let age: number = 25;
let name: string = "Andrea";
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ["Età", 25];
```

### Any e Unknown

* `any`: Disabilita il controllo dei tipi (evitare quando possibile).
* `unknown`: Simile a `any` ma più sicuro: richiede un controllo prima dell’uso.

```ts
let notSure: any = 4;
let value: unknown = "Hello";
if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

---

## 3. Tipi personalizzati: Type vs Interface

### 3.1 Type

`type` permette di definire **alias di tipo**, unendo tipi esistenti o creando nuovi tipi complessi.

```ts
type Product = {
  id: number;
  name: string;
  price: number;
};

const myProduct: Product = {
  id: 1,
  name: "Laptop",
  price: 1200,
};
```

### 3.2 Interface

`interface` permette di definire **contratti per oggetti**. Può essere estesa e implementata da classi.

```ts
interface ProductInterface {
  id: number;
  name: string;
  price: number;
}

const prod: ProductInterface = {
  id: 2,
  name: "Mouse",
  price: 25,
};
```

### Differenze principali

| Feature                  | Type | Interface           |
| ------------------------ | ---- | ------------------- |
| Dichiarazione di oggetti | ✅    | ✅                   |
| Estensione di più tipi   | ✅    | ✅                   |
| Dichiarazioni multiple   | ❌    | ✅ (merge)           |
| Union/Intersection       | ✅    | ❌ (solo estensione) |

---

## 4. Funzioni

### Tipizzazione dei parametri e del ritorno

```ts
function sum(a: number, b: number): number {
  return a + b;
}
```

### Parametri opzionali e default

```ts
function greet(name: string, greeting?: string) {
  console.log(`${greeting ?? "Ciao"}, ${name}`);
}

function multiply(a: number, b: number = 2) {
  return a * b;
}
```

### Funzioni con type

```ts
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (x, y) => x + y;
```

---

## 5. Oggetti e strutture complesse

TypeScript consente di tipizzare oggetti con proprietà opzionali, readonly e index signature.

```ts
interface User {
  readonly id: number;
  name: string;
  age?: number;
  [key: string]: any; proprietà dinamiche
}

const user: User = { id: 1, name: "Andrea", role: "studente" };
```

---

## 6. Union e Intersection

### Union

Permette a una variabile di essere di **più tipi**.

```ts
let id: number | string;
id = 10;
id = "abc";
```

### Intersection

Combina più tipi in uno solo.

```ts
type A = { a: number };
type B = { b: string };
type C = A & B;

const obj: C = { a: 1, b: "hello" };
```

---

## 7. Tipi letterali e enum

### Tipi letterali

```ts
type Direction = "up" | "down" | "left" | "right";
let move: Direction = "up";
```

### Enum

```ts
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

---

## 8. Classi e interfacce

```ts
interface Person {
  name: string;
  greet(): void;
}

class Employee implements Person {
  constructor(public name: string, public salary: number) {}
  greet() {
    console.log(`Ciao, sono ${this.name}`);
  }
}
```

* `implements` garantisce che la classe rispetti l’interfaccia.
* `public`, `private`, `protected` definiscono la visibilità delle proprietà.

---

## 9. Tipi avanzati

* **Generics**: consentono di scrivere codice riutilizzabile con tipi variabili.

```ts
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("ciao");
```

* **Type Guards**: controllo dei tipi runtime per variabili di tipo `union`.

```ts
function isNumber(x: number | string): x is number {
  return typeof x === "number";
}
```

---

## 10. Best practices

* Usare `interface` per oggetti e classi, `type` per alias complessi.
* Evitare `any`.
* Scrivere funzioni tipizzate.
* Usare `readonly` e parametri opzionali per sicurezza.
* Preferire `enum` o union di stringhe invece di magic strings.

```ts
============================
ESERCIZIO 1 - TIPI BASE
============================

Crea le seguenti variabili con il tipo esplicito:
- age (number)
- username (string)
- isLogged (boolean)
- scores (array di numeri)

Obiettivo: usare number, string, boolean, number[]


============================
ESERCIZIO 2 - FUNZIONI TIPIZZATE
============================

Crea una funzione chiamata sum che:
- accetta due parametri numerici
- ritorna un numero
- deve generare errore se viene passata una stringa

Esempi di utilizzo:
sum(4, 5)      ok
sum("4", 5)    errore


============================
ESERCIZIO 3 - OGGETTI TIPIZZATI
============================

Crea un oggetto User con:
- id (number)
- name (string)
- email (string)
- isAdmin (boolean)

Prima tipizza l'oggetto inline.
Poi crea un type o un interface chiamato User
e usa quello per tipizzare l'oggetto.

Mini-challenge:
Scrivi una funzione makeAdmin(user: User): User
che restituisce una copia dell'utente con isAdmin impostato a true
senza modificare l'oggetto originale


============================
ESERCIZIO 4 - TYPE VS INTERFACE
============================

Definisci un tipo Product con:
- id (number)
- name (string)
- price (number)

Crea una funzione che accetta un Product
e stampa: "Prodotto: Nome - €Prezzo"

Prova a farlo sia con type che con interface


============================
ESERCIZIO 5 - UNION TYPES
============================

Crea una funzione printId che:
- accetta un parametro che può essere number oppure string
- stampa: "ID: valore"

Esempi di utilizzo:
printId(123)      OK
printId("abc123") OK
printId(true)     Deve dare errore

Bonus:
- Usa typeof per distinguere i due casi
- Se è number stampa: "ID numerico: valore"
- Se è string stampa: "ID stringa: valore"


============================
ESERCIZIO 6 - OPTIONAL PROPERTIES
============================

Crea un'interfaccia Car con:
- brand (string)
- model (string)
- year (number)
- color (opzionale)

Crea due oggetti:
- uno con color
- uno senza color


============================
ESERCIZIO 7 - LITERAL TYPES
============================

Crea una variabile role che può essere solo:
- "admin"
- "user"
- "guest"

Prova ad assegnare un valore non valido e verifica che TypeScript dia errore


============================
ESERCIZIO 8 - GENERICS BASE
============================

Crea una funzione generica identity che:
- accetta un parametro di tipo generico T
- ritorna lo stesso valore

Testala con:
- un numero
- una stringa
- un array

NON usare any


============================
ESERCIZIO 9 - ARRAY DI OGGETTI TIPIZZATI
============================

Crea un'interfaccia User con:
- id (number)
- name (string)
- isAdmin (boolean)

Crea un array di User

Scrivi una funzione che:
- accetta l'array
- ritorna solo gli utenti admin

La funzione deve essere tipizzata correttamente


============================
ESERCIZIO 10 - ASYNC + TYPESCRIPT
============================

Crea un'interfaccia Post con:
- id (number)
- title (string)
- body (string)

Scrivi una funzione async che:
- simula una fetch (puoi usare Promise.resolve)
- ritorna un array di Post
- deve avere tipo Promise<Post[]>

Non usare any
```
