"use strict"

const X0 = 152
const Y0 = 109;

const VERDE = "rgba(0, 200, 0, 0.5)"  // semitrasparente
const ROSSO = "rgba(255, 0, 0, 0.5)"  // semitrasparente
const BLU  =  "rgba(0, 0, 255, 0.5)"  // semitrasparente

let nomeFila =["T","S","R","Q","P","O","N","M","L","I",  "H","G","F","E","D","C","B","A"]
let nomeColonna=[28,26,24,22,20,18,16,14,12,10,8,6,4,2,  1,3,5,7,9,11,13,15,17,19,21,23,25,27]

let inizioFine = [
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 

	{"inizio":1, "fine":26}, 
	{"inizio":2, "fine":25}, 
	{"inizio":2, "fine":25}, 
	{"inizio":3, "fine":24}, 
	{"inizio":3, "fine":24}, 
	{"inizio":4, "fine":23}, 
	{"inizio":4, "fine":23}, 
	{"inizio":4, "fine":23}, 
]


let wrapper = document.getElementById("wrapper")
let divSpettacoli= document.getElementById("divSpettacoli")
let divMappa= document.getElementById("divMappa")
	
let titolo = wrapper.querySelector("h3")
let sottotitolo = wrapper.querySelector("p")
let mappa= divMappa.querySelector("div")
let btnAcquista = divMappa.querySelector("button")
			
divMappa.style.diplay = "none"
