"use strict"

const DIM = 5;
const parole=["Barca", "Fiore", "Gente", "Fuoco", "Fungo", "Opaco", "Prova", "Sasso", "Scusa", "Torta", "Vespa"];
let parolaSegreta;
let rigaCorrente = 0;
let wrapper = document.getElementById("wrapper");
let txtParola = document.getElementsByTagName("input")[0];

init();


function init(){
    for(let i = 0; i < DIM; i++)
    {
        for(let j = 0; j < DIM; j++)
        {
            let div = document.createElement("div");
            div.id=`div_${i}_${j}`
            div.classList.add("cella")
            wrapper.appendChild(div)
        }
    }
    let n = generaNumero(0,parole.length);
    parolaSegreta = parole[n].toUpperCase();
    console.log(parolaSegreta);
    let div = document.getElementById(`div_0_0`)
    div.textContent = parolaSegreta[0];
    txtParola.focus();

}

txtParola.addEventListener("keydown", function(event)
{
    let char = event.key;
    console.log(char)
    if(!(char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z' || char == "Backspace" || char == "Enter"))
    {
        event.preventDefault();
    }
}
);

txtParola.addEventListener("keyup", function(event)
{
    txtParola.value = txtParola.value.toUpperCase();
    if(event.key == "Enter")
    {
        verifica();
    }
}
);


function verifica()
{
    if(txtParola.value.length < 5)
    {
        alert("Parola troppo corta!")
        txtParola.value = ""
    }
    else 
    {
        let ausSegreta = "";
        for(let j = 0; j < DIM; j++)
        {
            if(parolaSegreta[j] == txtParola.value[j])
            {
                let div = document.getElementById(`div_${rigaCorrente}_${j}`);
                div.textContent = parolaSegreta[j];
                div.style.backgroundColor = "yellowGreen"
                ausSegreta += "*";

            }
            else 
            {
                ausSegreta += parolaSegreta[j];
            }
        }
        console.log(ausSegreta)
        for(let j = 0; j < DIM; j++ )
        {
            if(ausSegreta.includes(txtParola.value[j]) &&  ausSegreta[j] != "*")
            {
                let div = document.getElementById(`div_${rigaCorrente}_${j}`);
                div.textContent = txtParola.value[j];
                div.style.backgroundColor = "yellow" 
                
            }
        }
        if(parolaSegreta == txtParola.value)
        {
                alert("Hai vinto!!!");
                txtParola.disabled = true;
        }
        else if(rigaCorrente == 4)
        {
            alert("Hai perso");
            txtParola.disabled = true;
        }
        else 
        {

            rigaCorrente++;
            txtParola.value = "";
        }

    }


}




function generaNumero(a, b){
    return Math.floor((b-a)*Math.random()) + a;
}

