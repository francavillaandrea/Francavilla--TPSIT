"use strict"
$("#generateBtn").on("click", () => {
    let testoUrl = $("#qrText").val().trim();
    let size = parseInt($("#qrSize").val());

    if (testoUrl == "") {
        alert("Inserisci testo o URL");
        return;
    }

    $("#qrcode").empty();

    //Genero QrCOde

    $("#qrcode").qrcode({
        text: testoUrl,
        width: size,
        height: size,
        correctLevel: 1
    })
})