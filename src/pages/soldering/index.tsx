import { Alert } from "@mui/material";
import { Button, Container, Stack, Text } from "@mantine/core";
import Link from "next/link";
import SolderingMDX from "../../../docs/soldering.mdx";

export default function Soldering() {
    return (
        <Container>
            <Alert severity="info">
                <Stack display={'flex'} justify="flex-start">
                    <Text variant="h5">Want to book a solder training?</Text>
                    <Button component={Link} href={"/soldering/booking"}>
                        www.amp-lab.org/soldering/booking
                    </Button>
                </Stack>
            </Alert>
            <SolderingMDX />
        </Container>
    );
}
