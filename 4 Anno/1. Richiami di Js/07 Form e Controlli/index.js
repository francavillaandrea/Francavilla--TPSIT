'use strict'

let form1 = document.getElementById("form1");
let txt1 = form1.querySelector("input[type=text]");
let lst1 = form1.querySelector("select:not([multiple])");
let lstMultiple = form1.querySelector("select[multiple]");
let chks = form1.querySelectorAll("input[name='chk']");
let rads = form1.querySelectorAll("input[name='opt']");

function visualizza(index) {
    if (!form1) return;
    let msg = "";

    switch (index) {
        case 1:
            msg = txt1.value;
            break;

        case 2:
            let option = lst1.options[lst1.selectedIndex];
            msg = "value: " + lst1.value + "\n" +
                  "text: " + option.text + "\n" +
                  "selectedIndex: " + lst1.selectedIndex;
            break;

        case 3:
            msg = "Tutti i checkbox:\n";
            for(let i = 0; i < chks.length; i++) {
                msg += (i + 1) + ". value: " + (chks[i].value || "non impostato") + 
                       ", checked: " + chks[i].checked + "\n";
            }
            break;

        case 4:
            msg = "Checkbox selezionati:\n";
            let numSelezionati = 0;
            for(let i = 0; i < chks.length; i++) {
                if(chks[i].checked) {
                    numSelezionati++;
                    msg += numSelezionati + ". value: " + (chks[i].value || "non impostato") + "\n";
                }
            }
            if(numSelezionati === 0) {
                msg += "Nessun checkbox selezionato";
            }
            break;

        case 5:
            msg = "Checkbox non selezionati:\n";
            let numNonSelezionati = 0;
            for(let i = 0; i < chks.length; i++) {
                if(!chks[i].checked) {
                    numNonSelezionati++;
                    msg += numNonSelezionati + ". value: " + (chks[i].value || "non impostato") + "\n";
                }
            }
            if(numNonSelezionati === 0) {
                msg += "Tutti i checkbox sono selezionati";
            }
            break;

        case 6:
            let radioSelezionato = form1.querySelector('input[name="opt"]:checked');
            msg = "Radio selezionato: " + (radioSelezionato ? radioSelezionato.value : "nessuna opzione selezionata");
            break;

        case 7:
            msg = "Radio non selezionati:\n";
            let numRadioNonSelezionati = 0;
            for(let i = 0; i < rads.length; i++) {
                if(!rads[i].checked) {
                    numRadioNonSelezionati++;
                    msg += numRadioNonSelezionati + ". " + rads[i].value + "\n";
                }
            }
            break;

        case 8:
            msg = "Opzioni selezionate:\n";
            let numOpzioniSelezionate = 0;
            for(let i = 0; i < lstMultiple.options.length; i++) {
                if(lstMultiple.options[i].selected) {
                    numOpzioniSelezionlezionate + ". " + lstMultiple.options[i].text + 
                          " (value: " + (lstMultiple.options[i].value || "non impostato") + ")\n";
                }
            }
            if(numOpzioniSelezionate === 0) {
                msg += "Nessuna opzione selezionata";
            }
            break;
    }
    alert(msg);
}

function imposta(index) {
    if (!form1) return;

    switch (index) {
        case 1:
            txt1.value = "Nuovo testo impostato";
            break;

        case 2:
            lst1.selectedIndex = 2;
            break;

        case 3:
            for(let i = 0; i < chks.length; i++) {
                chks[i].checked = !chks[i].checked;
            }
            break;

        case 4:
            let radioForse = form1.querySelector('input[name="opt"][value="forse"]');
            if (radioForse) radioForse.checked = true;
            break;

        case 5:
            for(let i = 0; i < lstMultiple.options.length; i++) {
                lstMultiple.options[i].selected = false;
            }
            if (lstMultiple.options.length > 2) {
                lstMultiple.options[1].selected = true;
                lstMultiple.options[2].selected = true;
            }
            break;
    }
}
