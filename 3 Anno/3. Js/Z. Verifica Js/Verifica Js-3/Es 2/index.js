"use strict"

const container1 = document.getElementById("container1");
const _divs = container1.getElementsByTagName("div");
const _btnVerifca = document.getElementById("btnVerifica");
let _pRis = document.getElementsByClassName("ris");
let temp = [];
let index = 0;

setProgram();
_btnVerifca.addEventListener("click", checkImgs);

function setProgram() 
{
    temp = [];
    for (let i = 0; i < _divs.length; i++) 
	{
        do 
		{
            index = random(1, 9);

        } while (temp.includes(index))
        
        temp[i] = index;
        _divs[i].style.backgroundImage = "url('img/img" + index + ".jpg')";
        _divs[i].semaforo = (temp[i] <= 4);
        _divs[i].style.borderColor = "#AFA";
        _divs[i].cliccato = false;
        _divs[i].addEventListener("click", imgClicked);
    }
}

function imgClicked() 
{
    if(this.cliccato == false) 
	{
        this.cliccato = true;
        this.style.borderColor = "#F00";
    }
    else 
	{
        this.cliccato = false;
        this.style.borderColor = "#AFA";
    }
}

function checkImgs() 
{
    let corretto = true;
    
    for(let i = 0; i < _divs.length; i++) 
	{
        if((_divs[i].cliccato && !_divs[i].semaforo) || (!_divs[i].cliccato && _divs[i].semaforo)) 
		{
            corretto = false;
            break;
        }
    }
    
    if(corretto) 
	{
        _pRis[0].textContent = "Bravo hai indovinato";
        _pRis[0].style.color = "#F00";
        _btnVerifca.disabled = true;
    } else 
	{
        _pRis[0].textContent = "Riprova";
        _pRis[0].style.color = "#AAA";
    }
}

function random(min, max) 
{
    return Math.floor((max - min + 1) * Math.random() + min);
}



