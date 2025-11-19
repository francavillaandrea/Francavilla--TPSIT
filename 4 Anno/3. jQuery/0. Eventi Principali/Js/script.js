"use strict"

$(document).ready(init)

function init() {

    function writeLog(msg) {
        $("#log").prepend(`<div> ${msg} </div>`);
    }

    $("#clickBox").click(function () {
        writeLog("Click su clickbox");
    });

    $("#dblclickBox").dblclick(function () {
        writeLog("Doppio click su clickbox");
    });

    $("#mouseenterBox").mouseenter(function () {
        writeLog("Mouse enter sul box");
    });

    $("#mouseleaveBox").mouseleave(function () {
        writeLog("Mouse leave sul box");
    });


    $("#mousedownBox").mousedown(function () {
        writeLog("Mouse down sul box");
    });

    $("#mouseupBox").mouseup(function () {
        writeLog("Mouse up sul box");
    });

    $("#hoverBox").hover(

        function () {
            writeLog("Mouse enter sul box");
        },

        function () {
            writeLog("Mouse leave sul box");
        }
    )
}

$(".form-control")[0]