"use strict"
let secretSquare = null;
$("#btnStart").click(() => {

    let index = Math.floor(Math.random() * $(".box").length);
    secretSquare = $(".box").eq(index); //.eq <--> secretSquare = $(".box")[index];
    $("#messaggio").text("Indovina quale quadrato è quello giusto!!!");
    $(".box").css("border-color", "black").empty();

});

$(".box").click((e) => {
    if (!secretSquare) {
        $("#messaggio").text("Devi premere gioca per iniziare!")
        return;
    }
    else if ($(event.target).is(secretSquare)) {
        $(event.target).css("border-color", "green").text("✅");
        $("#messaggio").text("Hai vinto!!!");
    }
    else {
        $(event.target).css("border-color", "red").text("❌");
        $("#messaggio").text("Sbagliato, Riprova!!!");

    }
});
