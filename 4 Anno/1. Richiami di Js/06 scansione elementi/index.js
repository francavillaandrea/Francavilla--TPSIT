'use strict'

let wrapper;
wrapper = document.querySelector("#wrapper");
let buttonsDiv = document.querySelector("#buttons");
let btns = buttonsDiv.querySelectorAll("input[type=button]");

function evidenzia(selector)
{
	for(let item of wrapper.children)
	{
		item.style.backgroundColor = ""
	}
	let elements = wrapper.querySelectorAll(selector);
	
	for(let element of elements)
	{
		element.style.backgroundColor = "yellow";
	}
}

