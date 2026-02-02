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
		inputLabel: "Trascinare lo slider tra 50 e 200",
		inputValue: "100",
		inputAttributes: { min: "50", max: "200", step: "1" },
		width: "400px",
		background: "#afa", // background-color non è riconosciuto
		showCancelButton: "true"
	})
	
	if(!result.isConfirmed){
		alert("sweet alert error")
		return;
	}
	let nPeople = result.value





	
})	


function generaNumero(a, b){
	return Math.floor((b-a)*Math.random()) + a
}
