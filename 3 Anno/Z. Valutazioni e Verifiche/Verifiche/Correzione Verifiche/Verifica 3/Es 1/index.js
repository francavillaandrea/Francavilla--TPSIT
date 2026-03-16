"use strict"

const nDOMANDE = 5;
const risposteCorrette = ['d', 'b', 'a', 'c', 'a'];

let _btn = document.getElementsByTagName("button")[0];
let _txtRis = document.getElementById("ris");
_btn.addEventListener("click", function()
{
    let punti = 0;
    let _radios = document.querySelectorAll("input[type=radio]:checked");
    
    if(_radios.length == nDOMANDE) //_radios.lenght == risposteCorrette.lenght
    {
        for(let i = 0; i < _radios.length; i++)
        {
            if(_radios[i].value == risposteCorrette[i])
            {
                punti += 2;
            }
            else
            {
                _radios[i].checked = false;
            }
        }
        _txtRis.style.display="block";
        _txtRis.innerHTML = `il tuo voto è: <strong> ${punti}</strong>`;
        _btn.disabled = true;

    }
    else 
    {
        alert("Devi rispondere a tutte le domande");
    }    
}
)

