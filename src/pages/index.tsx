import { useState } from "react";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import { Button, Stack } from "@mantine/core";

export default function Home() {
    const [showButton, setShowButton] = useState(false);

    return (
        <Stack justify="center" h={'100%'}>
            <div style={{ fontSize : '5rem', textAlign : 'center'}}>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .changeDelay(50)
                            .pauseFor(250)
                            .typeString("The AMP Lab Virginia Tech")
                            .pauseFor(250)
                            .callFunction(() => { setShowButton(true) })
                            .start();
                    }}
                />
            </div>

            {showButton && <Button component={Link} href='/getting_started' fullWidth={false}>Getting Started</Button>}
        </Stack>
    );
}
