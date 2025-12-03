let sequenza = [];
let sequenzaUtente = [];
let colori = ["red", "yellow", "green", "blue"];
let livello;

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

    sequenza.push(colori[Math.floor(Math.random() * colori.length)]);
    //espandi(sequenza[sequenza.length - 1])

    playSequence()
}

function playSequence() {
    let i = 0;
    let interval = setInterval(() => {
        espandi(sequenza[i]);
        i++;
    }, 600)
}

function espandi(colore) {
    $(`#${colore}`).addClass("active");
    setTimeout(() => $(`#${colore}`).removeClass("active"), 300);
}