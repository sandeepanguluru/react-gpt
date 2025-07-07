// Home.js
import React, { useContext } from "react";
import { ContextTheme } from "./ContextTheme";
import { Switch, Box, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Home = () => {
  const { darkMode, toggleTheme } = useContext(ContextTheme);

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "background.default", // uses MUI theme color
        color: "text.primary",         // auto adjusts in dark/light mode
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {darkMode ? "Dark Mode" : "Light Mode"}
      </Typography>
      <Switch
        checked={darkMode}
        onChange={toggleTheme}
        icon={<Brightness7Icon />}
        checkedIcon={<Brightness4Icon />}
      />
    </Box>
  );
};

export default Home;
