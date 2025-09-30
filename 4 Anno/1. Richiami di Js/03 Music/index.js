"use strict"

<<<<<<< HEAD
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

=======
const content = document.getElementById("content");
const genderElements = document.querySelectorAll(".dropdown-menu .dropdown-item");
const iFriends = document.getElementById("i-friends");
const alertFriends = document.getElementById("alert-friends");
const iSearch = document.getElementById("i-search");
const txtSearch = document.getElementById("txt-search");
const playModal = new bootstrap.Modal(document.getElementById('play-modal'));

loadSongs();

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}.${remainingSeconds.toString().padStart(2, '0')}`;
}

function loadSongs(category = "All") {
    content.innerHTML = "";
    let songCount = 0;

    if (category === "All") {
        songCount = songs.length;
    } else {
        for (let i = 0; i < songs.length; i++) {
            if (songs[i][5] === category) {
                songCount++;
            }
        }
    }

    let h3 = document.createElement("h3");
    h3.className = "text-center";
    h3.textContent = `Trovati ${songCount} dischi`;
    content.appendChild(h3);

    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        if (category === "All" || song[5] === category) {
            const [id, title, artist, album, duration, genre, streams] = song;
            
            const songElement = document.createElement('div');
            songElement.classList.add('row', 'border', 'rounded', 'p-2', 'mb-3', 'align-items-center');
            
            songElement.innerHTML = `
                <div class="col-md-3 mb-2 mb-md-0">
                    <img src="img/cover${id}.jpg" class="img-fluid rounded" alt="${album}">
                </div>
                <div class="col-md-9">
                    <div class="mb-2">
                        <h4 class="mb-1">${id} - ${title}</h4>
                        <p class="mb-1">Artist: ${artist}</p>
                        <p class="mb-1">Album: ${album}</p>
                        <p class="mb-1">Duration: ${formatDuration(duration)}</p>
                        <p class="mb-2">Streams: ${streams}</p>
                        <button class="btn btn-secondary" onclick="playSong('${title}')">
                            Play
                        </button>
                    </div>
                </div>
            `;
            
            content.appendChild(songElement);
        }
    }
}

for (let i = 0; i < genderElements.length; i++) {
    genderElements[i].addEventListener("click", function(e) {
        e.preventDefault();
        
        for (let j = 0; j < genderElements.length; j++) {
            genderElements[j].classList.remove("active");
        }
        
        this.classList.add("active");
        
        loadSongs(this.textContent);
    });
}


function playSong(songTitle) {
    document.getElementById("song-title-modal").textContent = songTitle;
    playModal.show();
}


iFriends.addEventListener("click", function() {
    alertFriends.classList.remove("d-none");
    setTimeout(() => alertFriends.classList.add("d-none"), 3000);
});

iSearch.addEventListener("click", function() {
    txtSearch.classList.toggle("d-none");
});



>>>>>>> c13b3f8af912aa510978cd8a4eacc97fab9fbe04
