import Level from "@/comps/SponsorshipLevel";
import { Text, Group, Container, Divider, Alert, Button, Table, Card, Stack, Title, type TableData } from "@mantine/core";
import Link from "next/link";
import { IconRosette, IconStar, IconTrophy, IconDiamond } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';

const tableData : TableData = {
    head : ["Description", "Value to Lab", "Approximate Annual Cost"],
    body : [
        ["Funding Student Project", "High",    "$300 per project"],
        ["Solder Training",         "High",    "$50 per student"],
        ["3D Printer Maintenance",  "Medium",  "$100"],
        ["CNC Supplies",            "Medium",  "$200"],
        ["Lab Upkeep",              "High",    "$500 per semester"],
    ],
};

export default function Sponsorship() {
    return (
        <Container pt={'20px'}>
            <Title> Sponsoring the Amp Lab</Title>
            <Divider m={'5px'}/>
            {/* Who are we */}
            <Title order={4}> Who are we? </Title>
            <Text>
                The Amp Lab is a student-run organization at Virginia Tech that aims
                to provide students with hands-on experience with PCB design, CAD,
                C++, and more. You name it, our students do it. That's where "Amp"
                comes from: we amplify the skills of our members. Giving them a true
                experience in "Autonomous Mastery Prototyping" (AMP)
            </Text>

            <Divider m={'5px'} />
            <Title order={4}> On the Horizon </Title>
            <HorizonCarousel />
            <Divider m={'5px'} />

            <Title order={4}> Sponsorship Levels </Title>
            <Alert variant="light">
                Note: higher tiers automatically roll in perks of lower tiers
            </Alert>
            <Stack>
                <Level
                    perks={[
                        "Signage in-lab praising your sponsorship",
                        "Opportunity to suggest projects for students to collaborate and work on with the company",
                        "Private recruiting event for the company for Amp Lab students",
                    ]}
                    price={"10,000"}
                    icon={<IconDiamond />}
                    level="Diamond" />
                <Level
                    perks={[
                        "Invitation to attend our Amp Lab sponsored recruiting event",
                        "Receive emails from us about our latest lab updates",
                    ]}
                    price={"5,000"}
                    icon={<IconTrophy />}
                    level="Gold" />
                <Level
                    perks={[
                        "Resumes from all our active members",
                        "Virtual meeting with Amp Lab leadership to thank you for your contribution",
                    ]}
                    price={"2,500"}
                    icon={<IconStar />}
                    level="Silver" />
                <Level
                    perks={["Recognition on our website"]}
                    price={"1,000"}
                    icon={<IconRosette />}
                    level="Bronze" />
            </Stack>


            <Group justify="center" pt={'xl'} pb={'xl'}>
                <Button component={Link} href="mailto:amp-lab-leadership-team-g@vt.edu">
                    Reach out about sponsoring us now!
                </Button>
            </Group>

            <Title order={3}> Average Current Operating Costs </Title>
            <Table data={tableData} />
        </Container>
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
                <Carousel.Slide component={Card} key={item.name} >
                    <Stack>
                        <Text fw={500}>{item.name}</Text>
                        <Text>{item.description}</Text>
                    </Stack>

                </Carousel.Slide>
            ))}
        </Carousel>
    );
}
