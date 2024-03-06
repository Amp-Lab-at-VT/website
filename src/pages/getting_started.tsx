//https://react-icons.github.io/react-icons/icons?name=bs
import IconAndName from "@/comps/IconAndName/IconAndName";
import { GiSolderingIron, GiReturnArrow, GiSwipeCard} from "react-icons/gi";
import { MdOutlineWavingHand } from "react-icons/md";
import { BsPrinterFill } from "react-icons/bs";
import { RxDiscordLogo } from "react-icons/rx";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { Title, Text, Container, SimpleGrid } from "@mantine/core";
import NewMembers from "../../docs/new_members.mdx";
import ReturningMembers from "../../docs/returning_members.mdx";

export default function GettingStarted() {
    return (
        <Container fluid={true}>
            <Title>Getting Started:</Title>
            <Text>
                Below is a list of options for you to engage with our lab. Select one
                to get started!
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 3, lg: 6 }}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}>
                <IconAndName
                    icon={<MdOutlineWavingHand />}
                    title="Getting Started: New Members"
                    buttonTitle="Click here to begin"
                    color="#f9f9f9"
                >
                    <NewMembers />
                </IconAndName>

                <IconAndName
                    icon={<GiReturnArrow />}
                    title="Returning Members"
                    buttonTitle="Click here to begin"
                    color="#f9f9f9"
                >
                    <ReturningMembers />
                </IconAndName>
                <IconAndName
                    href="https://discord.gg/DjFCeQEMmE"
                    icon={<RxDiscordLogo />}
                    title="Join our Discord"
                    buttonTitle="Click here to begin"
                    color="#f9f9f9"
                ></IconAndName>
                <IconAndName
                    href="/soldering"
                    icon={<GiSolderingIron />}
                    title="Solder Training Information"
                    buttonTitle="Click here to begin"
                    color="#f9f9f9"
                ></IconAndName>
                <IconAndName
                    href="https://github.com/Amp-Lab-at-VT/print-queue/issues/new?assignees=octocat&labels=3d-print&template=3d_print.yml&title=%5B3d-print%5D%3A+"
                    icon={<BsPrinterFill />}
                    title="Get Something 3D Printed"
                    buttonTitle="Click here to begin"
                    color="#f9f9f9"
                ></IconAndName>
                <IconAndName
                    icon={<BiPurchaseTagAlt />}
                    title="Submit a Purchase Request"
                    buttonTitle="Click here to begin"
                    color="#f9f9f9"
                >
                    <p>
                        It is now easier than ever to get what you need! Just head on over
                        to the Discord, and submit your bill of materials in the{" "}
                        <b>purchase request</b> channel
                    </p>
                </IconAndName>
                <IconAndName
                    href="/docs/swipe-access"
                    icon={<GiSwipeCard />}
                    title="Get Lab Swipe Access"
                    buttonTitle="Click here to begin"
                    color="#f9f9f9"
                ></IconAndName>
            </SimpleGrid>
        </Container>
    );
}
