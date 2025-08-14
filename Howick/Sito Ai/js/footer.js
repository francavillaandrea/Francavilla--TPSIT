document.addEventListener('DOMContentLoaded', () => {
    const checkScroll = () => {
        // Calcola se siamo vicini al fondo della pagina
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        const buffer = 50; // pixels dal fondo

        if (pageHeight - scrollPosition <= buffer) {
            document.body.classList.add('at-bottom');
        } else {
            document.body.classList.remove('at-bottom');
        }
    };

    // Controlla lo scroll
    window.addEventListener('scroll', checkScroll);
    // Controlla anche al caricamento della pagina
    checkScroll();
});
