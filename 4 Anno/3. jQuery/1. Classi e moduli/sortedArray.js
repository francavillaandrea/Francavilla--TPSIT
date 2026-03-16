
class SortedArray {
	
    constructor(compareFn) {
		this.items = [];	
		this.compareFn = compareFn || function(a, b) {
			return a.localeCompare(b);
		};
    }

	add(value) {
		let low = 0, high = this.items.length;
		while (low < high) {
		  let mid = Math.floor((low + high) / 2);
		  // ricerca binaria
		  if (this.compareFn(this.items[mid], value) < 0) low = mid + 1;
		  else high = mid;
		}
		// inserisco l'elemento in posizione low
		this.items.splice(low, 0, value);
		}

	// Il get trasforma un metodo in Property
	get values() {
		return this.items;
	}
}

export default SortedArray;




