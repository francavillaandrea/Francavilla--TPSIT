const token = "BQAWaWLn7cJwEUlGDfwqR-7f7YWHmH5ou6T8nOzcIhUz39S02BsfWl6z-ZpxrZsyNVLRc_mWVhr1eyZOVctpRY9JQVWzAyFPjg9Rv8rNqeoWclOfbyKRNYhDLhOQaLSNoV8kM1XxwHg"; // Il tuo Access Token

async function getCurrentlyPlaying() {
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (!response.ok) {
        document.getElementById("spotify-track").innerHTML = "<p>❌ Nessun brano in riproduzione</p>";
        return;
    }

    const data = await response.json();
    if (!data.item) return;

    const track = data.item;
    const progressMinutes = Math.floor(data.progress_ms / 60000);
    const progressSeconds = Math.floor((data.progress_ms % 60000) / 1000);

    document.getElementById("spotify-track").innerHTML = `
        <img src="${track.album.images[0].url}" width="150">
        <p><strong>${track.name}</strong><br>di ${track.artists.map(a => a.name).join(", ")}</p>
        <p>Album: ${track.album.name}</p>
        <p>Minuto attuale: ${progressMinutes}:${progressSeconds.toString().padStart(2, "0")}</p>
    `;
}

getCurrentlyPlaying();
setInterval(getCurrentlyPlaying, 10000); // Aggiorna ogni 10 secondi
