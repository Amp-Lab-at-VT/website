"use client";

// Create an MUI theme provider

import React, { useContext, useEffect } from "react"; // Import useContext from react package
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";

import { setCookie, getCookie } from "cookies-next";
import { LinearProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";

export const brand = {
  // Blue shades (original palette)
  50: "#EBF3FA", // Very light blue tint
  100: "#C8DBF1", // Light blue tint
  200: "#A3C2E7", // Soft light blue
  300: "#6D9BCC", // Muted medium blue
  400: "#4576A6", // Muted teal-blue (closer to #204d71)
  500: "#204D71", // Base color
  600: "#1C4565", // Darker blue variant
  700: "#173953", // Darker and slightly muted
  800: "#122C41", // Deep blue shade
  900: "#0C2131", // Very deep navy blue

  // Green shades (complementary tones)
  1000: "#A1D7B7", // Soft light green
  1100: "#7BC78C", // Fresh green, light accent color
  1200: "#56A876", // Muted green, slightly earthy
  1300: "#4A8D62", // Deeper green, balanced with the blues
  1400: "#3B704F", // Earthy green, darker and natural

  // Yellow accents (complementary to blue-green range)
  1500: "#F1E36D", // Soft pale yellow
  1600: "#F0C341", // Vibrant yellow, strong accent
  1700: "#D98F2D", // Golden amber shade
  1800: "#B66A22", // Rich golden tone, darker accent

  // Neutral tones (for balance and grounding)
  1900: "#F4F4F4", // Very light gray
  2000: "#D1D1D1", // Light gray for subtle backgrounds
  2100: "#A0A0A0", // Neutral gray
  2200: "#6A6A6A", // Mid-tone gray
  2300: "#3A3A3A", // Darker gray, for text or accents

  // Red tones (for contrast and emphasis)
  2400: "#F4B0B0", // Soft pinkish-red, light accent
  2500: "#F17D6A", // Coral red, warm and vibrant
  2600: "#D15F4C", // Muted brick red, earthy tone
  2700: "#A74F3E", // Deep red, darker contrast color
  2800: "#7F3629", // Rich, dark red, grounding accent
};

const commonText = {
  fontFamily: ["Inter", "system-ui", "-apple-system", "sans-serif"].join(","),
  h1: {
    fontSize: "3rem",
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "-0.025em",
    color: "#1a1a1a",
  },
  h2: {
    fontSize: "2.25rem",
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: "-0.02em",
    color: "#204d71",
  },
  h3: {
    fontSize: "1.875rem",
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: "-0.015em",
    color: "#1a1a1a",
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: 1.4,
    color: "#204d71",
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: 1.5,
    color: "#374151",
  },
  h6: {
    fontSize: "1.125rem",
    fontWeight: 500,
    lineHeight: 1.5,
    color: "#374151",
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.6,
    color: "#4b5563",
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.5,
    color: "#6b7280",
  },
  subtitle1: {
    fontSize: "1.125rem",
    fontWeight: 500,
    lineHeight: 1.5,
    color: "#374151",
  },
  subtitle2: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.4,
    color: "#6b7280",
  },
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b6fa0",
      light: "#6d9bcc",
      dark: "#204d71",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#7BC78C",
      light: "#a1d7b7",
      dark: "#4a8d62",
      contrastText: "#000000",
    },
    error: {
      main: "#f87171",
      light: "#fca5a5",
      dark: "#dc2626",
    },
    warning: {
      main: "#fbbf24",
      light: "#fde047",
      dark: "#d97706",
    },
    info: {
      main: "#60a5fa",
      light: "#93c5fd",
      dark: "#2563eb",
    },
    success: {
      main: "#34d399",
      light: "#6ee7b7",
      dark: "#059669",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
      modal: "#334155",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#cbd5e1",
      disabled: "#64748b",
    },
    divider: "#334155",
    action: {
      active: "#3b6fa0",
      hover: "rgba(59, 111, 160, 0.08)",
      selected: "rgba(59, 111, 160, 0.12)",
      disabled: "rgba(255, 255, 255, 0.26)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#64748b #1e293b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#1e293b",
            width: 8,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#64748b",
            minHeight: 24,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 500,
          padding: "10px 20px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          },
        },
        contained: {
          boxShadow: "0 2px 8px rgba(59, 111, 160, 0.3)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e293b",
          color: "#f8fafc",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiBox: {
      defaultProps: {
        style: {
          backgroundColor: "transparent",
        },
      },
    },
  },
  typography: {
    ...commonText,
    h1: { ...commonText.h1, color: "#f8fafc" },
    h2: { ...commonText.h2, color: "#3b6fa0" },
    h3: { ...commonText.h3, color: "#f8fafc" },
    h4: { ...commonText.h4, color: "#3b6fa0" },
    h5: { ...commonText.h5, color: "#cbd5e1" },
    h6: { ...commonText.h6, color: "#cbd5e1" },
    body1: { ...commonText.body1, color: "#e2e8f0" },
    body2: { ...commonText.body2, color: "#cbd5e1" },
    subtitle1: { ...commonText.subtitle1, color: "#cbd5e1" },
    subtitle2: { ...commonText.subtitle2, color: "#94a3b8" },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#204d71",
      light: "#3b6fa0",
      dark: "#173953",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#7BC78C",
      light: "#a1d7b7",
      dark: "#4a8d62",
      contrastText: "#ffffff",
    },
    error: {
      main: "#dc2626",
      light: "#f87171",
      dark: "#991b1b",
    },
    warning: {
      main: "#d97706",
      light: "#fbbf24",
      dark: "#92400e",
    },
    info: {
      main: "#2563eb",
      light: "#60a5fa",
      dark: "#1d4ed8",
    },
    success: {
      main: "#059669",
      light: "#34d399",
      dark: "#047857",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
      modal: "#f3f4f6",
    },
    text: {
      primary: "#111827",
      secondary: "#6b7280",
      disabled: "#9ca3af",
    },
    divider: "#e5e7eb",
    action: {
      active: "#204d71",
      hover: "rgba(32, 77, 113, 0.04)",
      selected: "rgba(32, 77, 113, 0.08)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b7280 #f3f4f6",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#f3f4f6",
            width: 8,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b7280",
            minHeight: 24,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 500,
          padding: "10px 20px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
        },
        contained: {
          boxShadow: "0 2px 8px rgba(32, 77, 113, 0.2)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#111827",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiBox: {
      defaultProps: {
        style: {
          backgroundColor: "transparent",
        },
      },
    },
  },
  typography: commonText,
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
});

// Create a context for dark mode or light mode
export const DarkmodeContext = React.createContext(null);

// const localStorage = new LocalStorage("./settings");

export function DarkmodeWrapper(props) {
  const [isDark, setIsDarkFinal] = React.useState(false);

  // when the component mounts, check if the user has a preference for dark mode
  // if they do, set the dark mode to their preference

  useEffect(() => {
    const isDark =
      getCookie("isDark") !== undefined ? getCookie("isDark") === "true" : false;
    setIsDarkFinal(isDark);
  }, []);

  function setIsDark(isDark) {
    setIsDarkFinal(isDark);
    setCookie("isDark", isDark);
  }

  return (
    <DarkmodeContext.Provider value={{ isDark, setIsDark }}>
      {isDark === null ? (
        <Box sx={{ width: "100%", height: "100vh", backgroundColor: "black" }}>
          <LinearProgress />
        </Box>
      ) : (
        props.children
      )}
    </DarkmodeContext.Provider>
  );
}

export default function StandardTheme(props) {
  return (
    <Box>
      <DarkmodeWrapper>
        <ModifiedThemeProvider>{props.children}</ModifiedThemeProvider>
      </DarkmodeWrapper>
    </Box>
  );
}

function ModifiedThemeProvider(props) {
  const { isDark } = useContext(DarkmodeContext);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <ToastContainer
        stacked
        limit={3}
        // Darkmode toast styling
        autoClose={2000}
        pauseOnFocusLoss
        theme={isDark ? "dark" : "light"}
      />
      {props.children}
    </ThemeProvider>
  );
}
