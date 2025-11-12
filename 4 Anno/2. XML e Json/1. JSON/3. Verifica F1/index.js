"use strict";

let scuderie = JSON.parse(database); 
const tbody = divPiloti.querySelector("tbody");

getScuderie(); 
getNazioni();
getPiloti();

function getScuderie(){
    let scuderieVet = [];
    // Carico vet scuderie
    for(let scuderia in scuderie)
    {
        scuderieVet.push(scuderia);
    }
    // Ordino vet scuderie 
    scuderieVet.sort();
    
    // Caricamento in lstBox: lstScuderie
    for(let scuderia of scuderieVet)
    {
        let opt = document.createElement("option");
        opt.textContent = scuderia;
        opt.value = scuderia;
        // Append opt in lst
        lstScuderie.appendChild(opt);
    }
    // Rimuovo selezione di default 
    lstScuderie.selectedIndex = -1;

}

function getNazioni(){
    let set = new Set();

    for(let key in scuderie)
    {
        let piloti = scuderie[key]["piloti"]; 
        // let piloti = scuderie[key].piloti; 
        for(let pilota of piloti)
        {
            // Mediante set evito di controllore
            // se inserita la stessa nazione più volte
            set.add(pilota.nazione);
        }
    }
    // Converto set in array 
    let vetNazioni = Array.from(set).sort();
    
    for(let nazione of vetNazioni)
    {
        let input = document.createElement("input");
        input.type = "checkbox";
        input.value = nazione;
        divNazioni.appendChild(input);
        let span = document.createElement("span");
        span.textContent = nazione;
        divNazioni.appendChild(span);
        let br = document.createElement("br");
        divNazioni.appendChild(br);
        
        input.addEventListener('change', function(){
            lstScuderie.selectedIndex = -1; 
            let vetNazioni = [];
            let checks = divNazioni.querySelectorAll("input[type=checkbox]");
            for(let checkbox of checks)
            {
                if (checkbox.checked)
                {
                    vetNazioni.push(checkbox.value);
                }
            }
        });
    }
}

function getPiloti(selectedScuderia){
    tbody.innerHTML = "";
    for(let key in scuderie)
    {
       if(!selectedScuderia || key == selectedScuderia)
       {
        let piloti = scuderie[key].piloti;
        for(let pilota of piloti)
        {
            let tr = document.createElement("tr");
            tbody.appendChild(tr);
            let td = document.createElement("td");
            td.textContent = pilota.numero;
            tr.appendChild(td);

            td = document.createElement("td");
            let span = document.createElement("span");
            span.textContent = pilota.nome;
            span.style.textDecoration = "underline";
            span.style.fontStyle = "italic";
            td.appendChild(span);
            tr.appendChild(td);

            td = document.createElement("td");
            td.textContent = pilota.nazione;
            tr.appendChild(td);

            td = document.createElement("td");
            td.textContent = key;
            tr.appendChild(td);
        }
       }
    }
}


// ----------- Gestione SCUDERIE ----------------

lstScuderie.addEventListener('change', function(){
    deselezionaCheckBox();
    getPiloti(this.value);
});

// ----------- Gestione TUTTI ----------------
let btnTutti = divPiloti.querySelector("button");
btnTutti.addEventListener('click', function(){
    deselezionaCheckBox();
    lstScuderie.selectedIndex = -1;
    getPiloti(); 
});

function deselezionaCheckBox()
{
    let checks = divNazioni.querySelectorAll("input[type=checkbox]");
    for(let checkbox of checks)
        checkbox.checked = false; 
}