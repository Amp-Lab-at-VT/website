//https://react-icons.github.io/react-icons/icons?name=bs
import { useState } from "react";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import { Button, Center } from "@mantine/core";

export default function Home() {
    const [showButton, setShowButton] = useState(false);

    return (
        <>
            <Center>
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
            </Center>

            {showButton && <Button component={Link} href='/getting_started'>Getting Started</Button>}
        </>
    );
}
