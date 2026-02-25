"use strict"
let vet = [
    {
        "nome": "pippo",
        "eta": 16,
    },

    {
        "nome": "pluto",
        "eta": 15,
    },

    {
        "nome": "test",
        "eta": 17,
    }
]

ordina();
cancella();

function ordina() {
    vet.sort((a, b) => {
        let str1 = a.eta;
        let str2 = b.eta;
        if (str1 < str2)
            return -1;
        else if (str1 > str2)
            return 1;
        else return 0
    });
}

function cancella() {
    for (let i = 0; i < vet.length; i++) {
        if (vet[i].nome == "pippo") {
            vet[i] = ""
        }
    }

    console.log(vet)
}
