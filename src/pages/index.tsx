import { useState } from "react";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import { Button, Center, Stack } from "@mantine/core";

export default function Home() {
    const [showButton, setShowButton] = useState(false);

    return (
        <Center fz={'h1'}>
            <Stack>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .changeDelay(50)
                            .pauseFor(250)
                            .typeString("The AMP Lab Virginia Tech")
                            .pauseFor(500)
                            .callFunction(() => { setShowButton(true) })
                            .start();
                    }}
                />
                {showButton && <Button component={Link} href='/getting_started'>Getting Started</Button>}
            </Stack>
        </Center>
    );
}
