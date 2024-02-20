import "@/styles/globals.css";
import '@mantine/core/styles.css';
import Footer from "@/comps/Footer/Footer";

// import image
import Image from "next/image";
import { MantineProvider, AppShell, Burger, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { AppProps } from "next/app";
import background from "../images/cover.jpeg";
import Link from "next/link";
import { BackgroundImage } from '@mantine/core';

export default function App({ Component, pageProps }: AppProps) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

    return (
        <MantineProvider>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: 'sm',
                    collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
                }}
                padding="md"
            >
                <AppShell.Header color="black">
                    <Group h="100%" px="md">
                        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar p="md">
                    <Stack>
                        <Link href="/">Home</Link>
                        <Link href="/getting_started">Getting Started</Link>
                        <Link href="/projects">Projects</Link>
                        <Link href="/about">About</Link>
                        <Link href="/resources">Resources</Link>
                        {/* <Link href="/useful_links">Useless Links</Link> */}
                    </Stack>
                </AppShell.Navbar>
                <AppShell.Main>
                    <BackgroundImage
                        src='https://raw.githubusercontent.com/Amp-Lab-at-VT/website/master/src/images/cover.jpeg'
                        // fill={true}
                        // sizes="100vw" style={{ objectFit: "cover" }}
                    />
                    <Component {...pageProps} />
                </AppShell.Main>
                <AppShell.Footer>
                    <Footer />
                </AppShell.Footer>
            </AppShell>

        </MantineProvider>
    );
}
