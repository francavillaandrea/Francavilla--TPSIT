'use strict'
let form1 = document.getElementById("form1")
let txt1 = form1.querySelector("input[type=text]")
let lst1 = form1.querySelector("select")


// richiamato dall'html
function visualizza(index) {
	let msg = "";
	let items;
	switch (index) {
		case 1:
			msg = txt1.value;
			break;
		case 2:
			msg = lst1.value;
	}
	alert(msg);
}


function imposta(index) {
	let items
	switch (index) {

	}
}

