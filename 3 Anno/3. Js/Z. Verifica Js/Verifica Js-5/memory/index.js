"use strict"

let wrapper = document.getElementById("wrapper");
let lstDimensione = document.getElementsByTagName("select")[0];
let dim = 0;
let primoClick = null;
let secondoClick = null;
let nClick = 0;
let timerId;

lstDimensione.selectedIndex = -1;
lstDimensione.addEventListener("change", function() {
    dim = parseInt(this.value);
    creaGriglia();
});

function creaGriglia() {
    wrapper.innerHTML = "";
    wrapper.style.width = (dim * 55) + "px";
    wrapper.style.height = (dim * 55) + "px";
    
    let numeri = [];
    for(let i = 1; i <= (dim * dim) / 2; i++) {
        numeri.push(i, i);
    }
    
    for(let i = 0; i < dim; i++) {
        for(let j = 0; j < dim; j++) {
            let btn = document.createElement("button");
            btn.className = "cella";
            
            let pos = generaNumero(0, numeri.length);
            btn.textContent = numeri[pos];
            numeri.splice(pos, 1);
            
            btn.addEventListener("click", gestisciClick);
            wrapper.appendChild(btn);
        }
    }
}

function gestisciClick() {
    if(this === primoClick) return;
    
    nClick++;
    if(nClick === 1) {
        primoClick = this;
        this.style.backgroundColor = "red";
        this.style.color = "white";
    }
    else if(nClick === 2) {
        secondoClick = this;
        this.style.backgroundColor = "red";
        this.style.color = "white";
        
        let celle = document.getElementsByClassName("cella");
        for(let i = 0; i < celle.length; i++) {
            celle[i].disabled = true;
        }
        
        timerId = setTimeout(function() {
            confrontaCelle();
        }, 500);
    }
}

function confrontaCelle() {
    if(primoClick.textContent === secondoClick.textContent) {
        primoClick.style.backgroundColor = "#88D";
        secondoClick.style.backgroundColor = "#88D";
    } else {
        primoClick.style.backgroundColor = "";
        primoClick.style.color = "";
        secondoClick.style.backgroundColor = "";
        secondoClick.style.color = "";
    }
    
    let celle = document.getElementsByClassName("cella");
    for(let i = 0; i < celle.length; i++) {
        if(celle[i].style.backgroundColor !== "#88D") {
            celle[i].disabled = false;
        }
    }
    
    primoClick = null;
    secondoClick = null;
    nClick = 0;
    
    let contaCelleBlu = 0;
    for(let i = 0; i < celle.length; i++) {
        if(celle[i].style.backgroundColor == "#88D") {
            contaCelleBlu++;
        }
    }
      if(contaCelleBlu === dim * dim) {
        setTimeout(function() {
            alert("Bravo hai vinto!");
        }, 200);
    }
}

function generaNumero(min, max) {
    return Math.floor((max-min)*Math.random() + min);
}
