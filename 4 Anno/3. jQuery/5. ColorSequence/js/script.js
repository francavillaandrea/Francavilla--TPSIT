$(document).ready(function () {
    let sequenza = [];
    let sequenzaUtente = [];
    let colori = ["green", "red", "yellow", "blue"];
    let livello;
    let puoiCliccare = false;

    $('#btnStart').on("click", function () {
        sequenza = [];
        sequenzaUtente = [];
        livello = 0;

        $('#level').text(livello);
        $('#txtStatus').text("Osserva la sequenza...");

        nextLevel();
    });


    function nextLevel() {
        livello++;
        $('#level').text(livello);
        $('#txtStatus').text("Osserva la sequenza...");

        // Estraggo casualmente un colore e carico in array sequenza
        sequenza.push(colori[Math.floor(Math.random() * colori.length)]);
        sequenza.push(colori[Math.floor(Math.random() * colori.length)]);
        sequenza.push(colori[Math.floor(Math.random() * colori.length)]);
        sequenza.push(colori[Math.floor(Math.random() * colori.length)]);

        setTimeout(playSequence, 800);

    }

    function espandi(colore) {
        $('#' + colore).addClass("active");
        setTimeout(() => $('#' + colore).removeClass("active"), 300);
    }

    function playSequence() {
        let i = 0;
        puoiCliccare = false;

        let interval = setInterval(() => {
            espandi(sequenza[i]);
            i++;

            if (i == sequenza.length) {
                clearInterval(interval);
                puoiCliccare = true;
            }
        }, 600);
    }
});