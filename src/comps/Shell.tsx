import Footer from "@/comps/Footer/Footer";
import { AppShell, Burger, Group, Stack, BackgroundImage, useMantineColorScheme, Space, Title, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from "next/link";
import { Themer } from "@/comps/Themer";
import Image from "next/image";


const ImageSize = 30;

export function Shell({children} : {children: React.ReactNode}){
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
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }}}>
            <AppShell.Header color="black">
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />

                        <Group ml='sm' component={Link} href={'/'} td={'none'} style={{color : 'unset'}}>
                            <Image src={'/favicon.ico'} alt={'AMP Lab Logo'} width={ImageSize} height={ImageSize} />
                            <Title order={2} m={0}>The AMP Lab at Virginia Tech</Title>
                        </Group>

                    </Group>


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
            <AppShell.Main pl={0} pr={0} >
                <BackgroundImage
                    src={colorScheme === 'light' ? '/cover.jpeg' : '/cover_dark.jpg'}
                    w={'99vw'}
                    h={'100vh'}
                    style={{backgroundRepeat : "repeat-y"}}
                    // sizes="100vw" style={{ objectFit: "cover" }}
                >
                    <Container size="90%">
                        {children}
                    </Container>

                    <Space h="100px" />
                </BackgroundImage>
            </AppShell.Main >
            <AppShell.Footer >
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
}
