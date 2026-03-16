"use strict"

window.addEventListener("load", function() {
	const content = document.getElementById("content")
	const genderElements = document.querySelectorAll(".dropdown-menu li");
	for (let genderElement of genderElements){
		genderElement.addEventListener("click", genderClick)
	}		
		
    const iFriends = document.getElementById("i-friends");
    iFriends.addEventListener("click", showAlert);
	const alertFriends = document.getElementById("alert-friends");

    const iSearch = document.getElementById("i-search");
    iSearch.addEventListener("click", toggleSearch);
	const txtSearch = document.getElementById("txt-search");
		
    loadSongs();










});

