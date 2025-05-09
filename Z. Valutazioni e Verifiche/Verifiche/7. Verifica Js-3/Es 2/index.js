"use strict"

const container1 = document.getElementById("container1");
const _divs = container1.getElementsByTagName("div");
const _btnVerifca = document.getElementById("btnVerifica");
let _pRis = document.getElementsByClassName("ris");
let temp = [];
let index = 0;
setProgram();

_btnVerifca.addEventListener("click", checkImgs);

function setProgram() {

	for (let i = 0; i < _divs.length; i++) {
		do {
			index = random(1, 10);

		} while (temp.includes(index))
		temp[i] = index;
		_divs[i].style.backgroundImage = "url('./img/img" + index + ".jpg')";
		if (i <= 4) {
			_divs[i].semaforo = true;
		}
		else {
			_divs[i].semaforo = false;
		}
		_divs[i].style.borderColor = "#AFA";
		_divs[i].cliccato = false;
		_divs[i].addEventListener("click", imgClicked);
	}
}

function imgClicked() {

	if (this.cliccato == false) 
	{
		this.style.borderColor = "#F00";
		this.cliccato = true;
	}
	else 
	{
		this.style.borderColor = "#AFA";
		this.cliccato = false;
	}

}

function checkImgs()
{
	for(let i = 0;  i < _divs.length;i++)
	{
		for(let j = 0; j <= 4; j++)
		{
			if((_divs[i].cliccato == true && _divs[i].semaforo == false) || !(_divs[i].cliccato == true && _divs[i].semaforo == false))
			{
				_pRis[0].textContent = "Bravo hai indovinato"
				_pRis[0].style.color = "#F00"
				_btnVerifca.disabled = true;
			}
			else if((_divs[i].cliccato == false && _divs[i].semaforo == false))
			{
				_pRis[0].textContent = "Riprova"
				_pRis[0].style.color = "#AAA"
			}
		}
	}
}

function random(min, max) {
	return Math.floor((max - min) * Math.random() + min)
}



