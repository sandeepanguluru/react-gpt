import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

export const DarkMode = () => {
  const initialTheme = () => {
    const savedTheme = localStorage.getItem("themeSet");
    return savedTheme ? JSON.parse(savedTheme) : false;
  };
  const [theme, setTheme] = useState(initialTheme); // false = Light Mode, true = Dark Mode
  useEffect(() => {
    localStorage.setItem("themeSet", JSON.stringify(theme));
  }, [theme]);
  const themeChange = () => {
    setTheme(prevTheme=>!prevTheme);
  };

  // Apply dynamic styles
  const containerStyle = {
    backgroundColor: theme ? "#121212" : "#f5f5f5",
    color: theme ? "white" : "black",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <h2>{theme ? "🌙 Dark Mode is ON" : "☀️ Light Mode is ON"}</h2>
      <Button variant="contained" onClick={themeChange}>
        {theme ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </Button>
    </div>
  );
};
