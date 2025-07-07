// ContextTheme.js
import { createTheme } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import useLocalStorage from "../utils/useLocalstorage";

// 1️⃣ Create the context
export const ContextTheme = createContext();

// 2️⃣ Context Provider component
export const ThemeProvider = ({ children }) => {
  // 3️⃣ Load theme from localStorage or default to false (light mode)
  const theme = () => {
    const mode = localStorage.getItem("theme");
    return mode ? JSON.parse(mode) : false;
  };

  // 4️⃣ State for dark mode
  const [darkMode, setDarkMode] = useLocalStorage("theme",false);

  // 5️⃣ Save the current theme in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  // 6️⃣ Function to toggle theme
  const toggleTheme = () => {
    setDarkMode((prevTheme) => !prevTheme);
  };
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2", // blue
      },
      background: {
        default: "#f5f5f5",
      },
    },
    typography: {
      fontFamily: "Roboto",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2", // blue
      },
      background: {
        default: "#f5f5f5",
      },
    },
    typography: {
      fontFamily: "Roboto",
    },
  });
  const activeTheme = darkMode ? darkTheme : lightTheme;
  // 7️⃣ Provide darkMode state and toggle function to all children
  return (
    <ContextTheme.Provider value={{ darkMode, toggleTheme }}>
      <MuiThemeProvider theme={activeTheme}>{children}</MuiThemeProvider>
    </ContextTheme.Provider>
  );
};
