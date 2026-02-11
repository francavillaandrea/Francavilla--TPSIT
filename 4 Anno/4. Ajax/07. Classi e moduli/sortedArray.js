
class SortedArray {
	
    // items = []   facoltativo	
	// compareFn    facoltativo
	
	constructor(compareFn) {
		if (typeof compareFn != "function") {
			// assegno una compareFn di default
			compareFn = function(a, b) {
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





