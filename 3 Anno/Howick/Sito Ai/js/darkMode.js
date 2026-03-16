document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.querySelector(".theme-switch__checkbox");
  const logo = document.getElementById("site-logo");
  const html = document.documentElement;

  // Determina il percorso base in base alla posizione della pagina
  const isInSubfolder = window.location.pathname.includes('/html/');
  const basePath = isInSubfolder ? '../' : './';
  const lightLogo = `${basePath}assets/logo/finalLogo.png`;
  const darkLogo = `${basePath}assets/logo/logoDark.png`;

  const applyTheme = (isDark) => {
    // Applica il tema usando data-theme invece di classi
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    
    // Salva la preferenza nel localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Aggiorna lo stato del checkbox
    checkbox.checked = isDark;

    // Anima e adatta il logo
    logo.classList.add("fade-out");

    setTimeout(() => {
      logo.src = isDark ? darkLogo : lightLogo;

      // Imposta dimensione uniforme per entrambi i loghi
      logo.style.width = "100px";
      logo.style.height = "auto";

      logo.classList.remove("fade-out");
      logo.classList.add("fade-in");

      setTimeout(() => logo.classList.remove("fade-in"), 400);
    }, 300);
  };

  // Recupera il tema salvato o usa dark come default
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  // Applica il tema iniziale
  applyTheme(savedTheme === 'dark');

  checkbox.addEventListener("change", (e) => {
    applyTheme(e.target.checked);
  });
});
