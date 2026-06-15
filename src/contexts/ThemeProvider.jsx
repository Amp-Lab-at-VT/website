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


//puruple  dark mode
const darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#a78bfa",   // light purple (main accent)
      light: "#c4b5fd",
      dark: "#7c3aed",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#f472b6",   // soft pink accent (optional contrast)
      light: "#f9a8d4",
      dark: "#db2777",
      contrastText: "#000000",
    },

    error: {
      main: "#f87171",
    },

    warning: {
      main: "#fbbf24",
    },

    info: {
      main: "#60a5fa",
    },

    success: {
      main: "#34d399",
    },

    background: {
      default: "#0b0b10",   // deeper, cleaner dark
      paper: "#151522",     // slightly purple-tinted surface
      modal: "#1c1c2a",
    },

    text: {
      primary: "#f8fafc",
      secondary: "#cbd5e1",
      disabled: "#64748b",
    },

    divider: "#2a2a3a",

    action: {
      hover: "rgba(167, 139, 250, 0.08)",
      selected: "rgba(167, 139, 250, 0.12)",
      disabled: "rgba(255,255,255,0.26)",
    },
  },

  typography: {
    ...commonText,
    h2: { ...commonText.h2, color: "#c4b5fd" }, // purple heading highlight
    h4: { ...commonText.h4, color: "#a78bfa" },
    h6: { ...commonText.h6, color: "#a78bfa" },
    body1: { ...commonText.body1, color: "#FFFFFF" },
    body2: { ...commonText.body2, color: "#f8fafc" },
  },

  spacing: 8,

  shape: {
    borderRadius: 8,
  },
});


//  red white light mode
const lightTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#b91c1c",   // deep red
      light: "#ef4444",
      dark: "#7f1d1d",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#dc2626",   // brighter red accent
      light: "#f87171",
      dark: "#991b1b",
      contrastText: "#ffffff",
    },

    background: {
      default: "#ffffff",
      paper: "#ffffff",
      modal: "#f9fafb",
    },

    text: {
      primary: "#111827",
      secondary: "#6b7280",
      disabled: "#9ca3af",
    },

    divider: "#e5e7eb",

    error: {
      main: "#dc2626",
    },

    success: {
      main: "#16a34a",
    },

    info: {
      main: "#2563eb",
    },

    warning: {
      main: "#d97706",
    },
  },


  typography: {
    ...commonText,
    h2: { ...commonText.h2, color: "#dc2626" },
    h4: { ...commonText.h4, color: "#dc2626" },
    h6: { ...commonText.h6, color: "#dc2626" },
    body1: { ...commonText.body1, color: "#000000" },
    body2: { ...commonText.body2, color: "#f87171" },
  },

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
