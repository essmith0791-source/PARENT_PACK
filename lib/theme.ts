// The only thing the site stores: a manual theme choice, in localStorage.
export const THEME_KEY = "pp-theme";

export type ThemeChoice = "auto" | "day" | "night";

// Runs in <head> before the first paint, so a saved choice never flashes the wrong theme.
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="day"||t==="night")document.documentElement.dataset.theme=t}catch(e){}`;
