document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.querySelector(".theme-switch__checkbox");
  const logo = document.getElementById("site-logo");

  const lightLogo = "../assets/logo/finalLogo.png";
  const darkLogo = "../assets/logo/logoDark.png";

  const applyTheme = (isDark) => {
    document.body.classList.toggle("dark-theme", isDark);

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

  // Inizializza tema
  applyTheme(checkbox.checked);

  checkbox.addEventListener("change", () => {
    applyTheme(checkbox.checked);
  });
});
