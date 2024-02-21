import React from "react";
import Image from "next/image";
import { Anchor, Card, Center, Text } from "@mantine/core";

const ImageSize = 200;

export default function LeadershipBox({src, name, title, email} : LeadershipBoxProps) {
    if (!src)
        return null;

    return (
        <Card shadow="sm" padding="xl" m={'5px'} >
            <Card.Section>
                <Center pt={'sm'}>
                    <Image src={src} alt={name + "Image"} width={ImageSize} height={ImageSize} />
                </Center>
            </Card.Section>

            <Text fw={500} size="lg" mt="md">
                {title}
            </Text>

            <Anchor mt="xs" c="dimmed" size="sm" href={"mailto:" + email}>
                {email}
            </Anchor>
        </Card>
    );
}

type LeadershipBoxProps = {
    src: string,
    name: string,
    title: string,
    email: string
}
