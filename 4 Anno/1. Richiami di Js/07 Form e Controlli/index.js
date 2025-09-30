"use strict"

const form1 = document.getElementById("form1")
const txt1 = form1.querySelector("input[type=text]");
const lst1 = form1.querySelector("select");
const lst2 = form1.querySelector("select[multiple]");
const chks = form1.querySelectorAll("input[type=checkbox][name=chk]");


// richiamato dall'html
function visualizza(index) {
    let msg = "";
    let items;
    switch (index) {
        case 1:
            msg = txt1.value;
            break;
        case 2:
            msg = lst1.value;
            break;
        case 3:
            //se item non ha il value automaticamente mette "on" per radio button e checkbox
            chks.forEach(function (item) {
                msg += item.value + "\n";
            });
            break;
        case 4:
            //Da fare in funzione eprche senno prende solo i checkbox selezionati all'avvio della pagina
            const chkChecked = form1.querySelectorAll("input[type=checkbox][name=chk]:checked");
            chkChecked.forEach(function (item) {
                msg += item.value + "\n";
            });
            break;
        case 5:
            const chkNotChecked = form1.querySelectorAll("input[type=checkbox][name=chk]:not(:checked)");
            chkNotChecked.forEach(function (item) {
                msg += item.value + "\n";
            });
            break;
        case 6:
            const radioChecked = form1.querySelector("input[type=radio][name=opt]:checked");
            if (radioChecked) {
                msg = radioChecked.value + "\n";
            }
            else {
                msg = "Seleziona un radio button!"
            }
            break;
        case 7:
            const radioNotChecked = form1.querySelectorAll("input[type=radio][name=opt]:not(:checked)");
            radioNotChecked.forEach(function (item) {
                msg += item.value + "\n";
            });
            break;
        case 8:
            for(let item of lst2.selectedOptions)
            {
                msg += item.value + "\n"    
            }
            break;


    }
    alert(msg);
}


function imposta(index) {
    let items
    switch (index) {
        case 1:
            let text = prompt("Inserire il contenuto del textbox");
            txt1.value = text 
    }
}
