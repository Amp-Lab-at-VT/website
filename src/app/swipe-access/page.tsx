import { Container, Text, Alert, Stack, Box, Button, Card, Group } from "@mantine/core";
import Link from "next/link";

export default function Page() {
    return (
        <Container>
            <Text variant="h4">
                Documents for Students using the ECE Design Studio
            </Text>
            <Alert>
                The documents on this page are utilized to obtain swipe access to AMP
                Lab (Whittemore 264), MDE Lab (Whittemore 264) and/or Robotics Lab
                (Durham 373). To obtain swipe access to these labs, download and
                adhere to requirements outlined in the Lab Training Guide. ECE Lab
                Policy and ECE Lab Waiver are support documents called out in the Lab
                Training Guide.
            </Alert>
            <Alert>
                Note: These documents are universal to both the MDE and AMP lab sides
                of the lab, but they do NOT grant you access to both sides of the lab.
                You will need to be apart of the AMP lab to use their side
            </Alert>
            <Stack>
                <SingleDoc
                    title="Lab Training Guide"
                    description="This contains the Lab Training Guide"
                    link={`https://github.com/Amp-Lab-at-VT/website/raw/master/docs/mde_docs/Lab%20Training%20Guide%20Rev%202.docx`}
                    last_updated="1/16/2024"
                />
                <SingleDoc
                    title="ECE Lab Policy"
                    description="This contains the policy for the ECE Lab Policy."
                    link={`https://github.com/Amp-Lab-at-VT/website/raw/master/docs/mde_docs/ECE%20Design%20Studio%20Policy.docx`}
                    last_updated="1/5/2024"
                />
                <SingleDoc
                    title="ECE Lab Waiver"
                    description={
                        <Box>
                            <Alert>
                                This is the document you will submit for swipe access
                            </Alert>
                            <Text>
                                This contains the waiver for the ECE Lab
                            </Text>
                        </Box>
                    }
                    link={`https://github.com/Amp-Lab-at-VT/website/raw/master/docs/mde_docs/ECE%20Integrated%20Design%20Studio%20Waiver.docx`}
                    last_updated="1/5/2024"
                />
            </Stack>
        </Container>
    );
}

function SingleDoc({ title, description, link, last_updated } : SingleDocProps) {

    return (
        <Card p={'20px'} mb={'2px'}>
            <Group justify="space-between">
                <Text variant="h6">{title}</Text>
                <Text variant="caption">
                    Last Updated: {last_updated}
                </Text>
            </Group>
            <Box>{description}</Box>
            <Button component={Link} href={link}>Download Document</Button>
        </Card>
    );
}
import type { Route } from 'next';
import type { JSX } from "react";
type SingleDocProps = {
    title: string;
    description: string | JSX.Element;
    link: Route;
    last_updated: string;
};
