/**
 * Gestisce la visualizzazione a schermo intero dei giochi
 * @param {HTMLElement} button - Il pulsante che ha attivato la funzione
 */
function fullscreenGame(button) {
    const iframe = button.previousElementSibling.querySelector('iframe');
    
    // Controllo dei vari metodi di fullscreen per compatibilità cross-browser
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) { // Safari
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE11
        iframe.msRequestFullscreen();
    }
}

// Gestione degli eventi di cambio fullscreen
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

/**
 * Gestisce i cambiamenti dello stato fullscreen
 */
function handleFullscreenChange() {
    const fullscreenElement = 
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullscreenElement ||
        document.msFullscreenElement;

    // Aggiorna l'interfaccia in base allo stato del fullscreen
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(button => {
        button.textContent = fullscreenElement ? 'Esci' : 'Schermo Intero';
    });
} 