'use strict'

let wrapper = document.querySelector("#wrapper");
let buttonsDiv = document.querySelector("#buttons");
let btns = buttonsDiv.querySelectorAll("input[type=button]");

function evidenzia(selector) {
	for (let item of wrapper.children) {
		item.style.backgroundColor = ""
	}
	let elements = wrapper.querySelectorAll(selector);

	for (let element of elements) {
		element.style.backgroundColor = "yellow";
	}
}

btns[0].addEventListener("click", function () {
	alert(wrapper.children.length);
});

btns[1].addEventListener("click", function () {
	let msg = ""
	Array.from(wrapper.children).forEach(function (item) {
			msg += item.textContent + "\n";
		});
	alert(msg)

});

btns[2].addEventListener("click", function () {
	
	let elements = wrapper.querySelectorAll(":nth-child(even)") 
	for (let element of elements) {
		element.style.backgroundColor = "yellow";
	}
});

btns[3].addEventListener("click", function () {
	
	let elements = wrapper.querySelectorAll(":nth-child(odd)") 
	elements.forEach(function(element,i){		
		element.style.backgroundColor = `rgb(0,${(i+1)*50},0`;
		
	});
	}
);


