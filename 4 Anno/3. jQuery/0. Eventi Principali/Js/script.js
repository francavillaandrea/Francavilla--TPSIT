"use strict";

$(document).ready(init);

function init() {

    function writeLog(msg) {
        $("#log").prepend(`<div>${msg}</div>`);
    }

    // Click
    $("#clickBox").click(() => { writeLog("Click su clickbox"); });

    // Doppio click
    $("#dblclickBox").dblclick(() => { writeLog("Doppio click su clickbox"); });

    // Mouse enter / leave
    $("#mouseenterBox").mouseenter(() => { writeLog("Mouse enter sul box"); });

    $("#mouseleaveBox").mouseleave(() => { writeLog("Mouse leave sul box"); });

    // Mouse down / up
    $("#mousedownBox").mousedown(() => { writeLog("Mouse down sul box"); });

    $("#mouseupBox").mouseup(() => { writeLog("Mouse up sul box"); });

    // Hover
    $("#hoverBox").hover(
        () => { writeLog("Mouse enter sul box"); },
        () => { writeLog("Mouse leave sul box"); }
    );

    // Focus / Blur
    $("#focusInput").focus(() => { writeLog("Evento focus su focusInput"); });

    $("#focusInput").blur(() => { writeLog("Evento blur su focusInput"); });

    // Keydown / Keyup
    $("#keyInput").keydown((e) => { writeLog(`Evento keydown: ${e.key}`); });

    $("#keyInput").keyup((e) => { writeLog(`Evento keyup: ${e.key}`); });

    // Change
    $("#selectChange").change((e) => { writeLog(`Evento change: ${$(e.target).val()}`);});

    // Submit
    $("#testForm").submit((e) => { e.preventDefault(); writeLog("Submit del form"); });

}
