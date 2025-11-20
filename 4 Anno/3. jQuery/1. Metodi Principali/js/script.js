"use strict";

function writeLog(msg) {
    $("#log").prepend(`<div>${msg}</div>`);
}

// Mostra / Nascondi
$("#hideBtn").click(() => {
    $("#box").hide(500);
    writeLog("hide()");
});

$("#showBtn").click(() => {
    $("#box").show(500);
    writeLog("show()");
});

$("#toggleBtn").click(() => {
    $("#box").toggle(500);
    writeLog("toggle()");
});

// Effetti fade
$("#fadeInBtn").click(() => {
    $("#box").fadeIn(400);
    writeLog("fadeIn()");
});

$("#fadeOutBtn").click(() => {
    $("#box").fadeOut(400);
    writeLog("fadeOut()");
});

// Effetti slide
$("#slideUpBtn").click(() => {
    $("#box").slideUp(400);
    writeLog("slideUp()");
});

$("#slideDownBtn").click(() => {
    $("#box").slideDown(400);
    writeLog("slideDown()");
});

//Classi CSS
$("#addClassBtn").click(() => {
    $("#box").addClass("border border-dark");
    writeLog("addClass()");
});

$("#removeClassBtn").click(() => {
    $("#box").removeClass("border border-dark");
    writeLog("removeClass()");
});

$("#toggleClassBtn").click(() => {
    $("#box").toggleClass("rounded");
    writeLog("toggleClass()");
});

$("#cssBtn").click(() => {
    const hex = Math.floor(Math.random() * 16777215).toString(16);
    $("#box").css("background-color", `#${hex}`);
    writeLog(`css() — colore #${hex}`);
});

//Contenuto / DOM

$("#attrBtn").click(() => {
    $("#box").attr("title", "Title Settato");
    writeLog("attr()");
});
$("#htmlBtn").click(() => {
    $("#box").html("<b> HTML Modificato </b>");
    writeLog("html()");
});
$("#textBtn").click(() => {
    $("#box").text("Testo Modificato");
    writeLog("text()");
});
$("#valBtn").click(() => {
    if ($("#box input").lenght == 0) {
        $("#box").html("<input type='text' value = 'Valore'>")
    }
    $("#box input").val("Nuovo Value");
    writeLog("val()");
});

$("#appendBtn").click(() => {
    $("#box").append("");
    writeLog("append()");
});
$("#prependBtn").click(() => {
    $("#box").prepend("");
    writeLog("prepend()");
});
$("#beforeBtn").click(() => {
    $("#box").before("");
    writeLog("before()");
});
$("#afterBtn").click(() => {
    $("#box").after("");
    writeLog("after()");
});
$("#removeBtn").click(() => {
    $("#box").remove("");
    writeLog("remove()");
});
$("#emptyBtn").click(() => {
    $("#box").empty("");
    writeLog("empty()");
});

$("#animateBtn").click(() => {
    $("#box").animate("");
    writeLog("animate()");
});
