"use strict";

// Funzione di utilità per scrivere nel log (prepend = aggiunge in cima).
function writeLog(msg) {
    $("#log").prepend(`<div>${msg}</div>`);
}

/*
  Sezione: Mostra / Nascondi
  - .hide(ms) / .show(ms) / .toggle(ms): metodi jQuery per nascondere/mostrare elementi
    con animazione della durata specificata in millisecondi.
*/
$("#hideBtn").click(() => {
    // Nasconde l'elemento con id #box in 500ms.
    $("#box").hide(500);
    writeLog("hide()");
});

$("#showBtn").click(() => {
    // Mostra l'elemento #box in 500ms.
    $("#box").show(500);
    writeLog("show()");
});

$("#toggleBtn").click(() => {
    // Alterna visibilità (se visibile -> nasconde, se nascosto -> mostra) in 500ms.
    $("#box").toggle(500);
    writeLog("toggle()");
});

/*
  Sezione: Effetti fade
  - .fadeIn(ms): aumenta l'opacità dell'elemento fino a renderlo visibile.
  - .fadeOut(ms): riduce l'opacità fino a renderlo invisibile.
*/
$("#fadeInBtn").click(() => {
    // Esegue un fade-in su #box in 400ms.
    $("#box").fadeIn(400);
    writeLog("fadeIn()");
});

$("#fadeOutBtn").click(() => {
    // Esegue un fade-out su #box in 400ms.
    $("#box").fadeOut(400);
    writeLog("fadeOut()");
});

/*
  Sezione: Effetti slide
  - .slideUp(ms): nasconde con effetto "scorrimento verso l'alto".
  - .slideDown(ms): mostra con effetto "scorrimento verso il basso".
*/
$("#slideUpBtn").click(() => {
    $("#box").slideUp(400);
    writeLog("slideUp()");
});

$("#slideDownBtn").click(() => {
    $("#box").slideDown(400);
    writeLog("slideDown()");
});

/*
  Sezione: Classi CSS
  - .addClass(className): aggiunge una o più classi al set di classi esistente.
  - .removeClass(className): rimuove la/le classe/i specificata/e.
  - .toggleClass(className): aggiunge la classe se assente, la rimuove se presente.
*/
$("#addClassBtn").click(() => {
    // Aggiunge le classi Bootstrap (o le classi indicate) a #box.
    $("#box").addClass("border border-dark");
    writeLog("addClass()");
});

$("#removeClassBtn").click(() => {
    // Rimuove le classi precedentemente aggiunte.
    $("#box").removeClass("border border-dark");
    writeLog("removeClass()");
});

$("#toggleClassBtn").click(() => {
    // Alterna la classe 'rounded' (ottimo per border-radius).
    $("#box").toggleClass("rounded");
    writeLog("toggleClass()");
});

/*
  .css(prop, value) imposta uno stile inline sull'elemento.
  Qui viene generato un colore esadecimale casuale e applicato come background-color.
*/
$("#cssBtn").click(() => {
    // Math.random() -> numero fra 0 e 1; moltiplicato per 16777215 (0xFFFFFF) e convertito in base16.
    const hex = Math.floor(Math.random() * 16777215).toString(16);
    // Imposta lo stile inline background-color su #box.
    $("#box").css("background-color", `#${hex}`);
    writeLog(`css() — colore #${hex}`);
});

/*
  Sezione: Contenuto / DOM
  - .attr(name, value): imposta un attributo HTML sull'elemento.
  - .html(htmlString): imposta l'innerHTML dell'elemento (interpreta markup).
  - .text(textString): imposta il contenuto testuale (escape automatico).
  - .val(value): ottiene o imposta il valore di un campo form (input, select, textarea).
*/
$("#attrBtn").click(() => {
    // Imposta l'attributo title di #box (compare come tooltip su hover).
    $("#box").attr("title", "Title Settato");
    writeLog("attr()");
});
$("#htmlBtn").click(() => {
    // Sostituisce il contenuto HTML interno di #box con il markup specificato.
    $("#box").html("<b> HTML Modificato </b>");
    writeLog("html()");
});
$("#textBtn").click(() => {
    // Sostituisce il contenuto testuale (senza interpretare HTML).
    $("#box").text("Testo Modificato");
    writeLog("text()");
});
$("#valBtn").click(() => {
    /*
      Verifica se esistono input dentro #box; se non ci sono, inserisce un input.
      Nota: il codice originale usa 'lenght' (probabile refuso) — non lo modifico
      come richiesto dall'utente, quindi la condizione rimane esattamente com'è.
    */
    if ($("#box input").lenght == 0) {
        // Inserisce un elemento input dentro #box con valore iniziale.
        $("#box").html("<input type='text' value = 'Valore'>")
    }
    // Imposta il valore del primo input trovato (o dell'input appena creato).
    $("#box input").val("Nuovo Value");
    writeLog("val()");
});

/*
  Metodi per inserire nuovo contenuto:
  - .append(content): aggiunge alla fine del contenuto interno dell'elemento.
  - .prepend(content): aggiunge all'inizio del contenuto interno dell'elemento.
  - .before(content): inserisce il contenuto prima dell'elemento stesso (nodo esterno).
  - .after(content): inserisce il contenuto dopo l'elemento stesso (nodo esterno).
*/
$("#appendBtn").click(() => {
    // Aggiunge un <span> alla fine del contenuto interno.
    $("#box").append(`<span>Append</span>`);
    writeLog("append()");
});
$("#prependBtn").click(() => {
    // Aggiunge un <span> all'inizio del contenuto interno.
    $("#box").prepend(`<span>Append</span>`);
    writeLog("prepend()");
});
$("#beforeBtn").click(() => {
    // Inserisce un nuovo div prima dell'elemento #box nel DOM.
    $("#box").before("<div class='event-box bg-secondary mt-2'> Before </div>");
    writeLog("before()");
});
$("#afterBtn").click(() => {
    // Inserisce un nuovo div dopo l'elemento #box nel DOM.
    $("#box").after("<div class='event-box bg-secondary mt-2'> After </div>");
    writeLog("after()");
});

/*
  - .remove(): rimuove completamente l'elemento selezionato dal DOM (non lascia traccia).
  - .empty(): svuota il contenuto interno dell'elemento (equivale a innerHTML = "").
*/
$("#removeBtn").click(() => {
    // Rimuove #box dal DOM.
    $("#box").remove();
    writeLog("remove()");
});
$("#emptyBtn").click(() => {
    // Svuota solo il contenuto interno di #box, mantenendo il nodo stesso.
    $("#box").empty();
    writeLog("empty()");
});

/*
  .animate(props, duration): esegue animazioni sui valori CSS numericabili.
  Qui si animano larghezza e altezza in sequenza.
*/
$("#animateBtn").click(() => {
    // Prima anima a 300x200 in 500ms, poi ritorna a 200x150.
    $("#box").animate({width: '300px', height: '200px'}, 500).animate({width: '200px', height: '150px'});
    writeLog("animate()");
});
