class SortedArray {
	
    // items = []   facoltativo	
	// compareFn    facoltativo
	
	//Riceve come parametro un puntatore a funzione
	constructor(compareFn) {
		//Controllo se gli ho passato una funzione, in caso contrario ne stabilisce una di default
		if (typeof compareFn != "function") {
			// assegno una compareFn di default
			compareFn = function(a, b) {
				//Funzione che restituisce -1 per a<b, 0 per a==b e 1 per a>b
				//NOTA: funziona solo se sono variabili scalari e non oggetti(tipo json)
			    return a.localeCompare(b);
			};
		}
		this.items = [];
		this.compareFn = compareFn;
	}

	add(value) {
		let low = 0, high = this.items.length;
		while (low < high) {
		  let mid = Math.floor((low + high) / 2);
		  // ricerca binaria
		  if (this.compareFn(this.items[mid], value) < 0) low = mid + 1;
		  else high = mid;
		}
		// inserisco l'elemento in posizione
		this.items.splice(low, 0, value);
		}

	// Il get trasforma un metodo in Property
	get values() {
		return this.items;
	}
}