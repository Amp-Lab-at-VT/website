import "@/styles/globals.css";
import '@mantine/core/styles.css';
import Navigation from "@/comps/Nav/Nav.jsx";
import Footer from "@/comps/Footer/Footer.jsx";

// import image
import Image from "next/image";

import type { AppProps } from "next/app";
import { Box } from "@mui/material";
import background from "../images/cover.jpeg";
import { MantineProvider } from '@mantine/core';


export default function App({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider>
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
                        fill={true}
                        sizes="100vw" style={{ objectFit: "cover" }}
                    />
                </Box>
                <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Navigation />
                    <Component {...pageProps} />
                    <Footer />
                </Box>
            </Box>
        </MantineProvider>
    );
}
