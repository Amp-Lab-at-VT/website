import '@mantine/code-highlight/styles.css';
import "@/styles/globals.css";
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import type { AppProps } from "next/app";
import Shell from './Shell';

const theme = createTheme({
    /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <Shell>
                <Component {...pageProps} />
            </Shell>
        </MantineProvider>
    );
}
