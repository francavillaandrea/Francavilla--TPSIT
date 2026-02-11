# React - Guida Completa Basata sulla Documentazione Ufficiale

## 1. Creare un Progetto React

### Metodo consigliato: Vite

```bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
```

Scegliere il template React o React + TypeScript quando richiesto.

### Metodo alternativo: Create React App (non più raccomandato per nuovi progetti)

```bash
npx create-react-app my-app
cd my-app
npm start
```

### Struttura base del progetto

```
my-app/
  node_modules/
  public/
  src/
    App.jsx
    main.jsx
  package.json
  vite.config.js
```

`main.jsx` monta l'applicazione:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

# 2. Concetti Fondamentali

## Cos'è React

React è una libreria JavaScript per costruire interfacce utente basate su componenti. È dichiarativa e basata su uno stato reattivo.

## Componenti

Un componente è una funzione che restituisce JSX.

```jsx
function Welcome() {
  return <h1>Hello World</h1>
}
```

I componenti devono iniziare con lettera maiuscola.

---

# 3. JSX

JSX è una sintassi che combina JavaScript e HTML.

Regole principali:

* Un solo elemento radice
* Chiusura obbligatoria dei tag
* Attributi in camelCase (className, onClick)

```jsx
const element = <h1 className="title">Ciao</h1>
```

Espressioni JavaScript dentro `{}`:

```jsx
const name = "Andrea"
return <h1>Ciao {name}</h1>
```

---

# 4. Props

Le props permettono di passare dati ai componenti.

```jsx
function Greeting({ name }) {
  return <h1>Ciao {name}</h1>
}

<Greeting name="Andrea" />
```

Le props sono immutabili.

---

# 5. Stato (useState)

Lo stato permette ai componenti di reagire ai cambiamenti.

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}
```

Regole:

* Non modificare direttamente lo stato
* Usare sempre la funzione setter

---

# 6. Eventi

Gli eventi si scrivono in camelCase.

```jsx
<button onClick={handleClick}>Click</button>
```

---

# 7. Rendering Condizionale

```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

Oppure:

```jsx
{isLoggedIn && <Dashboard />}
```

---

# 8. Liste e Keys

```jsx
const items = [1,2,3]

items.map(item => (
  <li key={item}>{item}</li>
))
```

Le key devono essere uniche tra fratelli.

---

# 9. useEffect

Permette di eseguire effetti collaterali.

```jsx
import { useEffect } from 'react'

useEffect(() => {
  console.log('Mounted')
}, [])
```

Dipendenze:

* `[]` → esegue una volta
* `[value]` → esegue quando cambia value

---

# 10. Form

```jsx
function Form() {
  const [value, setValue] = useState('')

  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}
```

---

# 11. Gestione dello Stato Complesso (useReducer)

```jsx
import { useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    default:
      return state
  }
}
```

---

# 12. Context API

```jsx
import { createContext, useContext } from 'react'

const ThemeContext = createContext()
```

Provider:

```jsx
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
```

---

# 13. Refs (useRef)

```jsx
import { useRef } from 'react'

const inputRef = useRef(null)

<input ref={inputRef} />
```

---

# 14. Hook Rules

* Usare Hook solo al top level
* Solo dentro componenti o custom hooks

---

# 15. Custom Hooks

```jsx
function useCounter() {
  const [count, setCount] = useState(0)
  return { count, setCount }
}
```

---

# 16. Performance

* React.memo
* useMemo
* useCallback

---

# 17. Strict Mode

```jsx
<React.StrictMode>
  <App />
</React.StrictMode>
```

Aiuta a individuare problemi durante lo sviluppo.

---

# 18. Rendering

React aggiorna il DOM in modo efficiente usando il reconciliation algorithm.

---

# 19. Best Practices

* Componenti piccoli e riutilizzabili
* Evitare duplicazione di stato
* Sollevare lo stato quando necessario
* Usare chiavi stabili

---

# 20. React con TypeScript

Installazione:

```bash
npm create vite@latest my-app -- --template react-ts
```

Tipizzare props:

```tsx
type Props = {
  name: string
}

function Greeting({ name }: Props) {
  return <h1>{name}</h1>
}
```

---

# 21. Build per Produzione

```bash
npm run build
```

Genera la cartella `dist/` pronta per il deploy.

---

# 22. Deployment

Può essere distribuito su:

* Vercel
* Netlify
* GitHub Pages
* Server Node

---

# 23. Architettura Consigliata

```
src/
  components/
  pages/
  hooks/
  context/
  assets/
  App.jsx
```

---

# 24. Concetti Moderni React

* Functional Components
* Hooks
* Concurrent Rendering
* Server Components

---

# 25. Riepilogo

Per padroneggiare React è necessario comprendere:

* Componenti
* Props
* Stato
* Effetti
* Rendering
* Gestione performance
* Architettura modulare

React è una libreria focalizzata sulla UI. Routing, gestione globale avanzata e data fetching strutturato richiedono librerie aggiuntive come React Router o framework come Next.js.
