"use strict";
window.onload= function(){
	
	let txtData1 = document.getElementById("txtData1");
	let txtData2 = document.getElementById("txtData2");
	let button = document.getElementsByTagName("button")[0];
	let log = document.getElementById("log");

	let dataCorrente = new Date()
	
	// Soluzione 1
	//txtData1.value = dataCorrente.toISOString().substring(0,10)

	//Soluzione 2 vale solo per le date ma non per date time
	txtData1.valueAsDate = dataCorrente

	txtData2.value = dataCorrente.toISOString().substring(0,16)


	button.addEventListener("click", function(){		
		log.innerHTML = ""
		log.innerHTML += txtData1.value + "<br>"
		log.innerHTML += txtData2.value + "<br><br>"
		
		let data1 = new Date(txtData1.value)
		let data2 = new Date(txtData2.value)

		log.innerHTML += data1.toString() + "<br>"
		log.innerHTML += data2.toString() + "<br><br>"

		log.innerHTML += data1.toISOString() + "<br>"
		log.innerHTML += data2.toISOString() + "<br><br>"

		log.innerHTML += data1.toLocaleString() + "<br>"
		log.innerHTML += data2.toLocaleString() + "<br><br>"

		log.innerHTML += data1.getTime() + "<br>"
		log.innerHTML += data2.getTime() + "<br><br>"

		//Differenza tra le due date (in giorni ore e minuti)
		
		let diff = data2 - data1
		//Così ottengo la differenza espressa in secondi
		diff = diff/1000

		//Così ottengo la differenza espressa in minuti
		diff = diff/60

		//Così ottengo i minuti reali
		let minuti = diff%60
		
		//Così ottengo la differenza espressa in ore
		diff = parseInt(diff/60) 

		//Così ottengo le ore reali
		let ore = diff%24 - (data2.getTimezoneOffset()/60)

		//Così ottengo la differenza espressa in giorni
		let giorni = parseInt(diff/24)

		log.innerHTML += `La differenza è di ${giorni} giorni, ${ore} ore e ${minuti} minuti` + "<br><br>"

			
	})

}
