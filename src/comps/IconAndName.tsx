"use client"
import { Card, Button, Text, Modal, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { Route } from "next";
import { useRouter } from "next/navigation";

export default function IconAndName({ icon, title, buttonTitle, color, href, modalContent } : BoxProps) {
    const router = useRouter();
    const [opened, { open, close }] = useDisclosure(false);

    function buttonClick() {
        if (href) router.push(href)
        else open()
    }

    return (
        <>
            <Modal opened={opened} w={'50%'} onClose={close} centered={true} withCloseButton={false}>
                {modalContent}
            </Modal>
            <Card withBorder={true}>
                <Card.Section fz={'80px'} color={color}>
                    <Center pt={'sm'}> {icon} </Center>
                </Card.Section>
                <Text fw={500} ta={'center'}>{title}</Text>
                <Button color="blue" fullWidth={true} mt="md" radius="md" onClick={buttonClick}>
                    {buttonTitle}
                </Button>
            </Card>
        </>
    );
}

import type { JSX } from "react";
type BoxProps = {
    icon: JSX.Element;
    title: string;
    buttonTitle: string;
    color: string;
    href ?: Route;
    modalContent ?: React.ReactNode;
};
