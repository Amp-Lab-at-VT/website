import { Card, Button, Text, Modal, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";

import React from "react";

const Box : React.FC<BoxProps> = ({ icon, title, buttonTitle, color, href=null, children }) => {
    const router = useRouter();
    const [opened, { open, close }] = useDisclosure(false);

    function buttonClick() {
        if (href) router.push(href)
        else open()
    }

    return (
        <>
            <Modal opened={opened} onClose={close} centered={true}>
                {children}
            </Modal>
            <Card withBorder={true}>
                <Card.Section fz={'80px'} color={color}>
                    <Center> {icon} </Center>
                </Card.Section>
                <Text fw={500}>{title}</Text>
                <Button color="blue" fullWidth={true} mt="md" radius="md" onClick={buttonClick}>
                    {buttonTitle}
                </Button>
            </Card>
        </>
    );
};
export default Box;

type BoxProps = {
    icon: JSX.Element;
    title: string;
    buttonTitle: string;
    color: string;
    href ?: string | null;
    children ?: React.ReactNode;
};
