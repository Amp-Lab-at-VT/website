"use client";

import React from "react";
import { Box, AppBar, Toolbar, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Hamburger from "@/comps/Hamburger/Hamburger.jsx";
import { DarkmodeContext } from "@/contexts/ThemeProvider.jsx";

export default function Navigation() {
  const { isDark, setIsDark } = React.useContext(DarkmodeContext);

  const handleToggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "black", zIndex: 0 }}>
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Hamburger />
        </Box>
        <IconButton color="inherit" onClick={handleToggleDarkMode}>
          {isDark ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
