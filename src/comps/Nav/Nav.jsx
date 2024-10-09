import React from "react";
import { Box, AppBar, Toolbar } from "@mui/material";
import Hamburger from "@/comps/Hamburger/Hamburger.jsx";

export default function Navigation() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black', zIndex: 0 }}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          <Hamburger />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
