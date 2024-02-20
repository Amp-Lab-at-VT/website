//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";
import { promises as fs } from "fs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import IconAndName from "@/comps/IconAndName/IconAndName";
import { GiSolderingIron, GiReturnArrow, GiSwipeCard} from "react-icons/gi";
import { MdOutlineWavingHand } from "react-icons/md";
import { BsPrinterFill } from "react-icons/bs";
import { RxDiscordLogo } from "react-icons/rx";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { StaticProps } from "@/utils/types";
import { Flex, Title, Text, Container, SimpleGrid } from "@mantine/core";

export default function GettingStarted({ new_members, returning_members } : StaticProps<typeof getStaticProps>) {
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
                    icon={<MdOutlineWavingHand> </MdOutlineWavingHand>}
                    title="Getting Started: New Members"
                    buttonTitle="Click here to begin"
                    color="#f9f9f9"
                >
                    <ReactMarkdown className="App-standardPage" rehypePlugins={[rehypeRaw]}>
                        {new_members}
                    </ReactMarkdown>
                </IconAndName>

                <IconAndName
                    icon={<GiReturnArrow> </GiReturnArrow>}
                    title="Returning Members"
                    buttonTitle="Click here to begin"
                    color="#f9f9f9"
                >
                    <ReactMarkdown className="App-standardPage" rehypePlugins={[rehypeRaw]}>
                        {returning_members}
                    </ReactMarkdown>
                </IconAndName>
                <IconAndName
                    href="https://discord.gg/DjFCeQEMmE"
                    icon={<RxDiscordLogo> </RxDiscordLogo>}
                    title="Join our Discord"
                    buttonTitle="Click here to begin"
                    color="#f9f9f9"
                ></IconAndName>
                <IconAndName
                    href="/soldering"
                    icon={<GiSolderingIron> </GiSolderingIron>}
                    title="Solder Training Information"
                    buttonTitle="Click here to begin"
                    color="#f9f9f9"
                ></IconAndName>
                <IconAndName
                    href="https://github.com/Amp-Lab-at-VT/print-queue/issues/new?assignees=octocat&labels=3d-print&template=3d_print.yml&title=%5B3d-print%5D%3A+"
                    icon={<BsPrinterFill> </BsPrinterFill>}
                    title="Get Something 3D Printed"
                    buttonTitle="Click here to begin"
                    color="#f9f9f9"
                ></IconAndName>
                <IconAndName
                    icon={<BiPurchaseTagAlt> </BiPurchaseTagAlt>}
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
                    icon={<GiSwipeCard> </GiSwipeCard>}
                    title="Get Lab Swipe Access"
                    buttonTitle="Click here to begin"
                    color="#f9f9f9"
                ></IconAndName>
            </SimpleGrid>
        </Container>
    );
}

export async function getStaticProps() {
    const new_members_file = "new_members.md";
    const new_members = await fs.readFile(
        process.cwd() + "/docs/" + new_members_file,
        "utf8",
    );

    const returning_members_file = "returning_members.md";
    const returning_members = await fs.readFile(
        process.cwd() + "/docs/" + returning_members_file,
        "utf8",
    );

    return { props: { new_members, returning_members } };
}
