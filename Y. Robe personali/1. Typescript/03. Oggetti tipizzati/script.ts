// Esercizio 03 - Oggetti Tipizzati
const user: {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean
} = {
    id: 0,
    name: "goku",
    email: "goku@sayan.com",
    isAdmin: true
};

// Definizione del type
type User = {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
};

// Uso del type --> assomiglia ad una struct e serve a definire i tipi delle variabili di un oggetto
const user2: User = {
    id: 1,
    name: "vegeta",
    email: "vegeta@sayan.com",
    isAdmin: false
};

const updated = makeAdmin(user2);
console.log(updated);

function makeAdmin(user: User): User {
    if (user.isAdmin) {
        console.log(`L'utente ${user.name} è già admin`);
        return user;
    }

    const updatedUser: User = {
        ...user,
        isAdmin: true
    };

    console.log(`L'utente ${user.name} è diventato admin`);
    return updatedUser;
}
