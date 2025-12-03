
// Variabili principali

let vSimboli = ["❤", "🍟", "😉", "🎈", "🥽", "🎨"];
let carteGirate = []; // Salvo carte girate
let bloccoClick; // blocco click multipli

$('#btnStart').click(avviaGioco);
$('#btnMostraTutte').click(function(){
    $('.carta').each(function(){
        $(this).text($(this).attr("data-simbolo")).fadeIn(200);
    });
});
$('#btnNascondiTutte').click(function(){
    $('.carta').slideUp(500, function(){
        $(this).text("?").slideDown(200);
    });
});

function avviaGioco()
{
    $('#gioco').empty(); // Rimuovo carte 
    $('#messaggio').text("Trova tutte le coppie!").css('color', 'green');

    // Creazione del mazzo di carte 
    let mazzo = vSimboli.concat(vSimboli);
    // Mischio mazzo 
    mazzo.sort(() => Math.random() - 0.5);
    //console.log("mischio ", mazzo);

    // Aggiungo carte nel contenitore
    $.each(mazzo, function(i, simbolo){
        let carta = $("<div>").addClass("carta").text("?").attr("data-simbolo", simbolo);
        $('#gioco').append(carta);
    });
}

$('#gioco').on("click", ".carta", function(){
    if (bloccoClick)
        return; 
    if ($(this).text() != "?")
        return; 

    $(this).text($(this).attr("data-simbolo"));

    carteGirate.push($(this));

    if(carteGirate.length == 2)
    {
        let [c1, c2] = carteGirate;

        if(c1.attr("data-simbolo") == c2.attr("data-simbolo"))
        {
            c1.css("background-color", "green").animate({opacity: 0.5}, 300);
            c2.css("background-color", "green").animate({opacity: 0.5}, 300);
            $('#messaggio').text("Coppia trovata!");
        }
        else
        {

        }
    }

});



$('#btnStart').trigger("click");