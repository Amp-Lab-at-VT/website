"use client";

import React from "react";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Hamburger from "@/comps/Hamburger/Hamburger.jsx";
import { DarkmodeContext } from "@/contexts/ThemeProvider.jsx";

export default function Navigation() {
  const { isDark, setIsDark } = React.useContext(DarkmodeContext);

  const handleToggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <Hamburger />
          <Typography 
            variant="h6" 
            sx={{ 
              ml: 1, 
              fontWeight: 600,
              background: 'linear-gradient(45deg, #204d71, #7BC78C)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            AMP Lab
          </Typography>
        </Box>
        
        <IconButton 
          color="inherit" 
          onClick={handleToggleDarkMode}
          sx={{
            borderRadius: 2,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: 'action.hover',
              transform: 'scale(1.05)',
            },
          }}
        >
          {isDark ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
