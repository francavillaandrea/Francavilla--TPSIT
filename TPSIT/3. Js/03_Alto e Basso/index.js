"use strict"
let nSegreto = generaNumero(1,101);
let cont;
let _txtNumero = document.getElementById("txtNumero");













function generaNumero(min,max){
    /*formula per generare un numero 
    casuale compreso tra min e max max escluso */
    let n = Math.floor((max-min)*Math.random()+min);
    return n;    
}