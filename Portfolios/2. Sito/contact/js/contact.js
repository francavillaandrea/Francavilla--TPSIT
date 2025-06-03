document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector(".contact-form");
    const submitButton = contactForm.querySelector('button[type="submit"]');

    // Inizializza EmailJS con la tua Public Key
    emailjs.init("1h_gmDv6ZhWULKYjG");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Disabilita il bottone e cambia il testo mentre invia
        submitButton.disabled = true;
        submitButton.textContent = "Invio in corso...";

        // Recupera i valori dei campi
        const nome = contactForm.querySelector('input[placeholder="Nome"]').value.trim();
        const email = contactForm.querySelector('input[placeholder="Email"]').value.trim();
        const oggetto = contactForm.querySelector('input[placeholder="Oggetto"]').value.trim();
        const messaggio = contactForm.querySelector('textarea[placeholder="Messaggio"]').value.trim();

        // Controllo campi vuoti
        if (!nome) {
            alert("⚠️ Il campo 'Nome' è obbligatorio.");
            resetButtonState();
            return;
        }
        if (!email) {
            alert("⚠️ Il campo 'Email' è obbligatorio.");
            resetButtonState();
            return;
        }
        if (!oggetto) {
            alert("⚠️ Il campo 'Oggetto' è obbligatorio.");
            resetButtonState();
            return;
        }
        if (!messaggio) {
            alert("⚠️ Il campo 'Messaggio' è obbligatorio.");
            resetButtonState();
            return;
        }

        // Controllo formato email
        if (!validateEmail(email)) {
            alert("⚠️ Inserisci un indirizzo email valido.");
            resetButtonState();
            return;
        }

        // Parametri per EmailJS
        const templateParams = {
            from_name: nome,
            from_email: email,
            subject: oggetto,
            message: messaggio,
        };

        // Invia il form tramite EmailJS
        emailjs.send("service_tfatqqj", "template_70nhssl", templateParams)
            .then(function () {
                alert("✅ Messaggio inviato con successo! Ti risponderò il prima possibile.");
                contactForm.reset();
            })
            .catch(function (error) {
                console.error("Errore durante l'invio:", error);
                alert("❌ Si è verificato un errore durante l'invio. Riprova più tardi.");
            })
            .finally(function () {
                // Riattiva il bottone e resetta il testo
                resetButtonState();
            });
    });

    // Funzione per validare l'email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Funzione per resettare lo stato del bottone
    function resetButtonState() {
        submitButton.disabled = false;
        submitButton.textContent = "Invia Messaggio";
    }
});
