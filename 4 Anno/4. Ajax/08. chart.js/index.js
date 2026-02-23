"use strict";

const wrapper = document.querySelector("#wrapper")
const table =  wrapper.querySelector("table") 
const tbody =  table.querySelector("tbody") 
const canvasContainer = wrapper.querySelector("#canvas") 
const canvas = canvasContainer.querySelector("canvas")
const buttons = wrapper.querySelectorAll("a") 

table.style.display = "none"
canvasContainer.style.display = "none"
buttons[0].style.display = "none"
buttons[1].style.display = "none"
	
let chart;
	
btnInvia.addEventListener("click", async function(){	
	// 1 Sweet Alert non restituisce una vera e propria Promise
	//   ma un oggetto then-able che ha il then ma non ha il catch
	let result =  await Swal.fire({
		title: "<b>How many people?</b>",
		icon: "question",
		input: "range",
		inputLabel: "Trascinare lo slider tra 10 e 100",
		inputValue: "100",
		inputAttributes: { min: "10", max: "100", step: "1" },
		width: "400px",
		background: "#afa", // background-color non è riconosciuto
		showCancelButton: "true"
	})
	
	if(!result.isConfirmed){
		alert("sweet alert error")
		return;
	}
	let nPeople = result.value

	// _limit => Quanti record restituire
	//let httpResponse = await ajax.sendRequest("GET", "/results", { _limit: nPeople });
	let httpResponse = await ajax.sendRequest("GET", "/api", { results: nPeople });
	//console.log(httpResponse.data);
	let nazioni = [];
	for (let person of httpResponse.data.results){
		const nat = person.nat;
		const item = nazioni.find((item) => { return item.nat == nat });
		
		if (!item)
			nazioni.push({ nat: nat, cnt: 1 });
		else{
			item.cnt++;
		}
	}
	// console.log(nazioni);

	table.style.display = "";
	tbody.innerHTML = "";

	for(let nazione of nazioni)
	{
		let tr = document.createElement("tr");
		tbody.appendChild(tr);

		let td = document.createElement("td");
		tr.appendChild(td);
		td.textContent = nazione.nat;
		
		td = document.createElement("td");
		tr.appendChild(td);
		td.textContent = nazione.cnt;
	}

	buttons[0].style.display = "";
	
	//#region Salvataggio su disco JSON nazioni
	//Passo 1: Conversione JSON -> BLOB
	//NDR: Blob() primo parametro: Vettore d'oggetti dello stesso tipo(serializzati) da convertire, 
	// secondo paramento: tipo di oggetto passato
	let blob = new Blob([JSON.stringify(nazioni,null,2)],{type: "application/json"});

	//Passo 2: Conversione BLOB -> URI BLOB	
	//BLOB: contenitore oggetti. URI BLOB: puntatore agli oggetti contenuti nel BLOB
	let uriBlob = URL.createObjectURL(blob);

	//Passo 3: Salvo l'uriBlob all'interno dell'attributo href del bottone
	buttons[0].href = uriBlob;
	//#endregion

	//#region creazione Grafico

	//Variabili di appoggio
	const title =  "Persone per nazione";
	let keys = [];
	let values = [];
	let colors = [];
	let max = 0;

	//Popolamento variabili di appoggio
	for(let nazione of nazioni)
	{
		keys.push(nazione.nat);
		values.push(nazione.cnt);
		//Controllo max
		if(nazione.cnt > max)
		{
			max = nazione.cnt;
		}

		//generazione numeri rgb
		const r = generaNumero(0, 255);
		const g = generaNumero(0, 255);
		const b = generaNumero(0, 255);

		//Aggiunta nel vettore colors del rgb
		colors.push(`rgb(${r}, ${g}, ${b})`);
	}

	//Passo alla funzione setChartOption le variabili d'appoggio create precedentemente
	//Ciò mi permette di settare le opzioni del chart
	myBarChart.setChartOptions(
		title,
		keys,
		values,
		colors,
		max
	);

	//Rendo il grafico visibile
	canvasContainer.style.display = "";

	//Se chart non è inizializzato lo inizializzo
	if(!chart)
	{
		//Il canvas deve avere una dimensione definita esplicitamente
		//Uso l'oggetto Chart preso dalla libreria passandogli:
		//il canva e le opzioni create precedentemente
		chart = new Chart(canvas, myBarChart.getChartOptions());
	}
	else
	{
		//Se chart è già inizializzato aggiorno il grafico
		chart.update();
	}

	//#endregion

	//#region salvataggio immagine grafico su disco

	//Passo 1: visualizzazione button
	buttons[1].style.display = "";
	buttons[1].addEventListener("click", salvataggioGrafico);

	//#endregion
})	

function salvataggioGrafico()
{
	//Passo 2: conversione canva -> URIdata
	myBarChart.setWhiteBackground(canvas);
	let uriData = canvas.toDataURL("image/png");

	//Passo 3: salvataggio URIdata dentro al href del btn
	//Questo avverrà prima che il canva venga modificato, di conseguenza per risolverlo
	//conviene impostarlo solo nel momento in cui l'utente preme sul tasto
	buttons[1].href = uriData;
}

function generaNumero(a, b){
	return Math.floor((b-a)*Math.random()) + a
}
