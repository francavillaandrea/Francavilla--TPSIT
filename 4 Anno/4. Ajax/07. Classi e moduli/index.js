//Si può creare anche nel main del file sortedArray.js
//NOTA: anche in javascript si possono creare classi soggette a SINGLETON

const sortedArray = new SortedArray();

sortedArray.add("Carlo");
sortedArray.add("Anna");
sortedArray.add("Luca");
sortedArray.add("Bruno");

// add("xxxx") // Errore di sintassi

//Items passa direttamente dalla proprietà pubblica
//values passa dal getter
visualizza(sortedArray.items); 
visualizza(sortedArray.values); 


function visualizza(vet){
    let s = ""
    for (let item of vet){
        s += item + "<br>"
    }
    s += "<br><br>"

    risultati.innerHTML += s

}

/* ************************************************ */

