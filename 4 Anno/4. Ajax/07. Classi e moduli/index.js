const sortedArray = new SortedArray();

sortedArray.add("Carlo");
sortedArray.add("Anna");
sortedArray.add("Luca");
sortedArray.add("Bruno");

// add("xxxx") // Errore di sintassi

visualizza(sortedArray.items);
visualizza(sortedArray.values);

function visualizza(vet) {
  let s = "";
  for (let item of vet) {
    s += item + "<br>";
}
s += "<br><br>";

  risultati.innerHTML += s;
}


/* ************************************************ */
