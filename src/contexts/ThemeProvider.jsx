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
  fontFamily: ["Poppins", "sans-serif"].join(","),
  h2: {
    fontSize: 36,
    fontWeight: 500,
    lineHeight: 1.5,
    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    color: "#204d71",
  },
  h3: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: 1.5,
    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
  },
  h4: {
    fontSize: 36,
    fontWeight: 500,
    lineHeight: 1.5,
    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
  },
  body: {
    fontSize: 36,
    fontWeight: 500,
    lineHeight: 1.5,
    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
  },
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    // palette values for dark mode
    primary: {
      main: "#204d71",
      light: brand[200],
      dark: brand[200],
      background: "204d71",
    },
    secondary: {
      main: "#fff",
      light: "#222",
    },
    background: {
      default: "#000",
      paper: "#000",
      modal: grey[900],
    },
    text: {
      primary: "#fff",
      secondary: grey[500],
    },
    forsythBlue: {
      main: "#0A3D62",
    },
  },
  components: {
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
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    // palette values for dark mode
    primary: {
      main: "#204d71",
      light: brand[200],
      dark: brand[500],
      background: "#204d71",
    },
    secondary: {
      main: "#000000",
      light: "#eee",
    },
    background: {
      default: "#fff",
      paper: "#fff",
      modal: grey[100],
    },
    text: {
      primary: "#000",
      secondary: grey[500],
    },
    forsythBlue: {
      main: "#0A3D62",
    },
  },
  components: {
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
});

// Create a context for dark mode or light mode
export const DarkmodeContext = React.createContext(null);

// const localStorage = new LocalStorage("./settings");

export function DarkmodeWrapper(props) {
  const [isDark, setIsDarkFinal] = React.useState(true);

  // when the component mounts, check if the user has a preference for dark mode
  // if they do, set the dark mode to their preference

  useEffect(() => {
    const isDark =
      getCookie("isDark") !== undefined ? getCookie("isDark") === "true" : true;
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
