import React, { useState } from "react";
import Link from "next/link";
import { 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  ListItemIcon,
  Typography,
  Box,
  Divider,
  useTheme
} from "@mui/material";
import { 
  Menu as MenuIcon,
  Home as HomeIcon,
  PlayArrow as GetStartedIcon,
  Code as ProjectsIcon,
  Info as AboutIcon,
  Book as ResourcesIcon,
  Description as DocsIcon,
  GitHub as GitHubIcon
} from "@mui/icons-material";

const navigationItems = [
  { title: "Home", href: "/", icon: <HomeIcon /> },
  { title: "Getting Started", href: "/getting_started", icon: <GetStartedIcon /> },
  { title: "Projects", href: "/projects", icon: <ProjectsIcon /> },
  { title: "About", href: "/about", icon: <AboutIcon /> },
  { title: "Resources", href: "/resources", icon: <ResourcesIcon /> },
  { title: "Documentation", href: "/documentation", icon: <DocsIcon /> },
  { title: "GitHub", href: "https://github.com/Amp-Lab-at-VT/website", icon: <GitHubIcon />, external: true },
];

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ 
          mr: 2,
          color: theme.palette.mode === 'light' ? '#111827' : '#f8fafc',
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: theme.palette.mode === 'light' 
              ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
              : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            AMP Lab
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Virginia Tech
          </Typography>
        </Box>
        
        <Divider />
        
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                component={item.external ? "a" : Link}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={toggleDrawer(false)}
                sx={{
                  py: 1.5,
                  mx: 1,
                  borderRadius: 2,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: theme.palette.primary.main, minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.title}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: '0.95rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
