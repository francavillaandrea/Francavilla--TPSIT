const words = [
    "computer", "javascript", "scuola", "programmare", "coding", "veloce",
    "studio", "html", "bootstrap", "jquery", "sviluppo", "tecnologia",
    "gioco", "digitare", "mouse", "tastiera", "logica", "funzione",
    "schermo", "processore", "database", "internet", "algoritmo", "matrice",
    "variabile", "condizione", "ciclo", "evento", "risorsa", "memoria",
    "connessione", "password", "cloud", "server", "debug", "sintassi"
];

let score;
let time = 30;

$("#startBtn").on("click", () => {
    score = 0;
    time = 30;

    $("#score").text(score);
    $("#time").text(time);

    //Abilito typingInput
    $("#typingInput").attr("disabled", false);
    $("#typingInput").val();


});

