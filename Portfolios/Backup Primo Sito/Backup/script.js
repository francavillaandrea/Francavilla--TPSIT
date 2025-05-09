const toggle = document.getElementById('toggle');

// Funzione per applicare la modalità chiara o scura in base alla preferenza salvata
function applyThemePreference() {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    toggle.checked = true;
  }
}

// Evento per il cambio di modalità
toggle.addEventListener('change', () => {
  document.body.classList.toggle('light-mode');
  
  // Salva la preferenza dell'utente in localStorage
  if (document.body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
});

// Applica la preferenza salvata al caricamento della pagina
applyThemePreference();
