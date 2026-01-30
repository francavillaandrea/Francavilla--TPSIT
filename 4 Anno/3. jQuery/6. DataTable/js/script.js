"use strict"
let table;


loadTable();

function loadTable() {
    let JSONdati = JSON.parse(jsonString);
    if ($.fn.DataTable.isDataTable("#tbUsers")) {
        table.clear().destroy();
    }

    table = $("#tbUsers").DataTable({
        data: JSONdati,
        columns: [
            { data: "id" },
            { data: "nome" },
            { data: "email" },
            { data: "citta" }
        ],
        pageLenght: 5,
        language: {
            lenghtMenu: "Mostra _MENU_ elementi",
            search: "Cerca:",
            info: "Mostra _START_ - _END_ di _TOTAL_",
            paginate:
            {
                first: "Prima",
                last: "Ultima",
                next: "->",
                previous: "<-"
            }
        }
    });
}

$("#btnRicarica").on("click", () => {
    loadTable();
});
