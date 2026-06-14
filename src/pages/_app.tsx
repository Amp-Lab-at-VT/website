import "@/styles/globals.css";

// import image
import Image from "next/image";

import type { AppProps } from "next/app";

import { Box } from "@mui/material";

import background from "../images/cover.jpeg";

function App({ Component, pageProps }: AppProps) {
  return (
    <Box sx={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          opacity: 0.25,
        }}
      >
        <Image
          src={background}
          alt="background"
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Component {...pageProps} />
      </Box>
    </Box>
  );
}

export default App;
