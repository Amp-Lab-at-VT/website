import Footer from "@/comps/Footer/Footer";
import { AppShell, Burger, Group, Stack, BackgroundImage, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from "next/link";
import { Themer } from "@/comps/Themer";


export default function Shell({children} : {children: React.ReactNode}){
    const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop, close: closeDesktop }] = useDisclosure(false);
    const { colorScheme } = useMantineColorScheme();

    function close() {
        closeMobile();
        closeDesktop();
    }
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }}}
            padding="md" >
            <AppShell.Header color="black">
                <Group h="100%" px="md">
                    <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                    <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                    <Themer />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md" >
                <Stack>
                    <Link onClick={close} href="/">                 Home            </Link>
                    <Link onClick={close} href="/getting_started">  Getting Started </Link>
                    <Link onClick={close} href="/projects">         Projects        </Link>
                    <Link onClick={close} href="/about">            About           </Link>
                    <Link onClick={close} href="/resources">        Resources       </Link>
                    {/* <Link href="/useful_links">Useless Links</Link> */}
                </Stack>
            </AppShell.Navbar>
            <AppShell.Main pl={0} pr={0}>
                <BackgroundImage
                    src={colorScheme === 'light' ? '/cover.jpeg' : '/cover_dark.jpg'}
                    w={'99vw'}
                    h={'100vh'}
                    style={{backgroundRepeat : "repeat-y"}}
                    // sizes="100vw" style={{ objectFit: "cover" }}
                >
                    {children}
                </BackgroundImage>
            </AppShell.Main>
            <AppShell.Footer>
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
}
