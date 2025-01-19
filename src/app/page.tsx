// import Typewriter from "typewriter-effect";
import Link from "next/link";
import { Button, Stack } from "@mantine/core";

export default function Home() {
    return (
        <Stack
            justify="center"
            h={"100%"}
            style={{ fontSize: "5rem", textAlign: "center" }}
        >
            The AMP Lab @ Virginia Tech
            <Button component={Link} href="/getting_started">
                Getting Started
            </Button>
        </Stack>
    );
}
