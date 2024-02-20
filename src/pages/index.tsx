//https://react-icons.github.io/react-icons/icons?name=bs
import { useState } from "react";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import { Center } from "@mantine/core";

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
            {/* <div style={{ padding: "50px" }}>
                {(showButton && (
                    <Link href="/getting_started" className="btn">
                        Getting Started
                    </Link>
                )) || (!showButton && ( <Link href="/getting_started" style={{ visibility: "hidden" }} className="btn" > Getting Started </Link> ))}
            </div> */}
        </>
    );
}
