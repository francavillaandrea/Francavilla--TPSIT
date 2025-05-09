document.addEventListener('DOMContentLoaded', function() {
    // Aggiunge animazione alle card degli hobby
    const hobbyCards = document.querySelectorAll('.hobby-card');
    hobbyCards.forEach((card, index) => {
        card.classList.add('animate');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});