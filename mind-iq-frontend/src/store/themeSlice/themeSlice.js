// store/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Determine system preference
const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// Determine the actual theme to apply based on mode
const getResolvedTheme = (mode) => {
  return mode === "system" ? getSystemTheme() : mode;
};

// Load initial theme mode
const getInitialThemeMode = () => {
  if (typeof window === "undefined") return "system";
  return localStorage.getItem("theme") || "system";
};

// Apply theme to <html>
const applyThemeClass = (mode) => {
  const theme = getResolvedTheme(mode);
  document.documentElement.classList.toggle("dark", theme === "dark");
};

const initialMode = getInitialThemeMode();
applyThemeClass(initialMode);

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: initialMode, // light | dark
  },
  reducers: {
    setTheme: (state, action) => {
      if (action.payload === "system") {
        state.mode = getSystemTheme();
      } else {
        state.mode = action.payload;
      }
      localStorage.setItem("theme", action.payload);
      applyThemeClass(action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
