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
    // Aba anônima ou localStorage desativado
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

  // Mobile

  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  function setMenuOpen(open) {
    menu.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }

  menuToggle.addEventListener("click", () => {
    setMenuOpen(!menu.classList.contains("is-open"));
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
});
