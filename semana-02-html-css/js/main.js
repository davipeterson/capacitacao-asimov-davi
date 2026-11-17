// Tema
const THEME_KEY = "tema";
const root = document.documentElement;

function readSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Pra aba anônima o localStorage não funciona
  }
}

function applyTheme(theme) {
  if (theme === "light") {
    root.dataset.theme = "light";
  } else {
    delete root.dataset.theme;
  }
}

applyTheme(readSavedTheme());

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function syncThemeUi() {
    const isLight = root.dataset.theme === "light";
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Mudar para o tema escuro" : "Mudar para o tema claro",
    );
    themeColor.setAttribute("content", isLight ? "#e9e8e5" : "#0f0f10");
  }

  syncThemeUi();

  themeToggle.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    applyTheme(next);
    saveTheme(next);
    syncThemeUi();
  });
});
