"use strict";

const LISTBOX = document.getElementById("lstSondaggi");

LISTBOX.selectedIndex = -1;
document.getElementById("btnInvia").addEventListener("click", function(){
    if(LISTBOX.selectedIndex === -1){
        alert("Seleziona un sondaggio.");
        return;
    }

    const FORM = this.parentElement;
    FORM.method = "GET";
    FORM.action = "./pagina2.php";
    FORM.submit();
});