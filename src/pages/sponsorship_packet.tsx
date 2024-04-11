import Level from "@/comps/Sponsorship/Level";
import { Box, Text, Group, Container, Divider, Alert, Button, Table, Card, Stack } from "@mantine/core";
import Link from "next/link";
import { IconRosette, IconStar, IconTrophy, IconDiamond } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';

const rows = [
    {description : "Funding Student Project", value : "High",   cost :  "$300 per project"},
    {description : "Solder Training",         value : "High",   cost : "$50 per student"},
    {description : "3D Printer Maintenance",  value : "Medium", cost : "$100"},
    {description : "CNC Supplies",            value : "Medium", cost : "$200"},
    {description : "Lab Upkeep",              value : "High",   cost : "$500 per semester"},
] as const;

export default function Sponsorship() {
    return (
        <Container pt={'20px'}>
            <Text size="xl"> Sponsoring the Amp Lab</Text>
            <Divider m={'5px'}/>
            {/* Who are we */}
            <Text size="lg"> Who are we? </Text>
            <Text size="sm">
                The Amp Lab is a student-run organization at Virginia Tech that aims
                to provide students with hands-on experience with PCB design, CAD,
                C++, and more. You name it, our students do it. That's where "Amp"
                comes from: we amplify the skills of our members. Giving them a true
                experience in "Autonomous Mastery Prototyping" (AMP)
            </Text>

            <Divider m={'5px'} />
            <Text size="lg"> On the Horizon </Text>
            <HorizonCarousel />
            <Divider m={'5px'} />

            <Text size="lg"> Sponsorship Levels </Text>
            <Alert variant="light">
                Note: higher tiers automatically roll in perks of lower tiers
            </Alert>
            <Level
                perks={[
                    "Signage in-lab praising your sponsorship",
                    "Opportunity to suggest projects for students to collaborate and work on with the company",
                    "Private recruiting event for the company for Amp Lab students",
                ]}
                price={"10,000"}
                icon={<IconDiamond />}
                level="Diamond"
            ></Level>
            <Level
                perks={[
                    "Invitation to attend our Amp Lab sponsored recruiting event",
                    "Receive emails from us about our latest lab updates",
                ]}
                price={"5,000"}
                icon={<IconTrophy />}
                level="Gold"
            ></Level>
            <Level
                perks={[
                    "Resumes from all our active members",
                    "Virtual meeting with Amp Lab leadership to thank you for your contribution",
                ]}
                price={"2,500"}
                icon={<IconStar />}
                level="Silver"
            ></Level>
            <Level
                perks={["Recognition on our website"]}
                price={"1,000"}
                icon={<IconRosette />}
                level="Bronze"
            ></Level>

            <Group justify="center">
                <Button component={Link} href="mailto:amp-lab-leadership-team-g@vt.edu">
                    Reach out about sponsoring us now!
                </Button>
            </Group>

            <Divider  m={'20px'} />

            <Text variant="h5"> Average Current Operating Costs </Text>
            <Divider  m={'5px'} />
            <Box>
                <CostsTable />
            </Box>
        </Container>
    );
}

function CostsTable() {
    const content = rows.map(row => (
        <Table.Tr key={row.description} >
            <Table.Td>{row.description}</Table.Td>
            <Table.Td align="right">{row.value}</Table.Td>
            <Table.Td align="right">{row.cost}</Table.Td>
        </Table.Tr>
    ));

    return (
        // <Table component={Paper}>
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Description</Table.Th>
                    <Table.Th align="right">Value to Lab</Table.Th>
                    <Table.Th align="right">Approximate Annual Cost</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {content}
            </Table.Tbody>
        </Table>
    );
}

// Possible examples
// - Solder Training boards
// - Components
// - Organizing Components
// - Uniform containers
// - Signage Materials
// - Soldering materials and tips
// ~ AWS package
// - Paid software for laser cutter
// - Fume extractor/fume pump
// - Backup 3D printer, spare parts
// - Possible CNC Parts
// - Batham Tools
// - OpenAI API Tokens

function HorizonCarousel() {
    const items = [
        {
            name: "Modernizing the Lab",
            description:
        "We are currently in the process of updating our lab to be more modern. We are seeking sustainable ways to keep the lab clean, organized, and safe. We are also looking to update our equipment to be more modern and efficient.",
            image: "/Generics/Lab1.jpg",
        },
        {
            name: "Updating signage to reflect sponsors",
            description:
        "As we encourage companies to sponsor us, we want to make sure that we are giving them the recognition they deserve. We are looking to update our signage to reflect our sponsors and their contributions to the lab.",
        },
        {
            name: "Updating our website",
            description:
        "We are looking to update our website to be more modern and user-friendly. We want to make sure that our website is easy to navigate and provides all the information that our sponsors and students need.",
        },
        {
            name: "Creating a backend for our website to make it more user-friendly",
            description:
        "We are looking to create a backend for our website to make it easier for our students sign up for solder training and other events, such as meet-and-greets with our sponsors",
        },
        {
            name: "Amp Lab T-Shirts",
            description:
        "We are looking to create Amp Lab T-Shirts for our members and leadership to wear. This will help us promote the lab and our sponsors.",
        },
    ] as const;

    return (
        <Carousel align="start" slideGap="xs" controlsOffset="xl" controlSize={25} loop={true} withIndicators={true}>
            {items.map((item) => (
                <Carousel.Slide component={Card} key={item.name}>
                    <Stack>
                        <Text fw={500}>{item.name}</Text>
                        <Text>{item.description}</Text>
                    </Stack>

                </Carousel.Slide>
            ))}
        </Carousel>
    );
}
