const words = [
    "computer", "javascript", "scuola", "programmare", "coding", "veloce",
    "studio", "html", "bootstrap", "jquery", "sviluppo", "tecnologia",
    "gioco", "digitare", "mouse", "tastiera", "logica", "funzione",
    "schermo", "processore", "database", "internet", "algoritmo", "matrice",
    "variabile", "condizione", "ciclo", "evento", "risorsa", "memoria",
    "connessione", "password", "cloud", "server", "debug", "sintassi"
];

let score = 0;
let time = 30;
let timeInterval = null;
let currentWord = "";

$("#startBtn").on("click", () => {
    score = 0;
    time = 30;

    $("#score").text(score);
    $("#time").text(time);

    $("#typingInput").attr("disabled", false);
    $("#typingInput").val("");

    $("#startBtn").attr("disabled", true);
    currentWord = generateWord(); 
    $("#wordDisplay").text(currentWord);

    timeInterval = setInterval(() => {
        time--;
        $("#time").text(time);
        if (time <= 0) {
            endGame();
        }
    }, 1000);


})

function endGame() {
    if (timeInterval) {
        clearInterval(timeInterval);
        timeInterval = null;
    }
    $("#typingInput").attr("disabled", true);
    $("#startBtn").attr("disabled", false);
    $("#wordDisplay").text("Game Over");
    $("#time").text(0);
}

function generateWord() {
    return words[Math.floor(Math.random() * words.length)];
}

$("#typingInput").on("input", function () {
    const val = $(this).val().trim();
    if (!val) return;
    if (val == currentWord) {
        score++;
        $("#score").text(score);
        $(this).val("");
        currentWord = generateWord();
        $("#wordDisplay").text(currentWord);
        time += 2;
        $("#time").text(time);
    }
});


