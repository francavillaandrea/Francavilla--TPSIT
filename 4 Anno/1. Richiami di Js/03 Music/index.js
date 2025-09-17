"use strict"
const content = document.getElementById("content")
const genderElements = document.querySelectorAll(".dropdown-menu li");
for (let genderElement of genderElements) {
	//genderElement.addEventListener("click", genderClick)
}

const iFriends = document.getElementById("i-friends");
//iFriends.addEventListener("click", showAlert);
const alertFriends = document.getElementById("alert-friends");

const iSearch = document.getElementById("i-search");
//iSearch.addEventListener("click", toggleSearch);
const txtSearch = document.getElementById("txt-search");

loadSongs();

function loadSongs()
{
	content.innerHTML = ""
	let h3 = document.createElement("h3")
	h3.textContent = `Numero di canzoni: ${songs.length}`
	content.appendChild(h3)
	for(let song of songs)
	{
		let row = document.createElement("div")
		content.appendChild(row)
		row.classList.add("row", "border", "rounded", "p-2", "m-2")
		
		let wrapper = document.createElement("div")
		row.appendChild(wrapper)
		//sugli schermi md e lg occupa 4 celle, sugli schermi da xl in poi occupa 3 celle
		wrapper.classList.add("col-md-4", "col-xl-3")

		let img = document.createElement("img")
		wrapper.appendChild(img)
		img.src=`./img/cover${song[0]}.jpg`
		img.classList.add("w-100", "rounded")

		let divInfo = document.createElement("div")
		row.appendChild(divInfo)
		divInfo.classList.add("col-md-8", "col-xl-9")

		let title = document.createElement("h2")
		divInfo.appendChild(title)
		title.textContent = `Title: ${song[0]} - ${song[1]}`

		let artist = document.createElement("h5")
		divInfo.appendChild(artist)
		title.textContent = `Artist: ${song[2]}`

		let album = document.createElement("h5")
		divInfo.appendChild(album)
		album.textContent = `Album: ${song[3]}`

		let duration = document.createElement("h5")
		divInfo.appendChild(duration)
		let secondiTot = song[4]
		let secondi = secondiTot%60
		//Parse Int tronca all'intero inferiore
		let minuti = parseInt(secondiTot/60)
		duration.textContent = `Duration: ${minuti} min ${secondi} s`

		let streams = document.createElement("h5")
		divInfo.appendChild(streams)
		streams.textContent = `Streams: ${song[6]}`
	}

}

