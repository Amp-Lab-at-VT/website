import {Anchor, Flex, Group, Text} from "@mantine/core";
import classes from "./Footer.module.css";
import Link from "next/link";
import type { JSX } from "react";


const links = [
    { link: '/getting_started', label: 'Getting Started' },
    { link: '/leadership', label: 'Leadership' },
] as const;

export default function Footer(): JSX.Element {
    const items = links.map((link) => (
        <Anchor
            component={Link}
            c="red"
            key={link.label}
            href={link.link}
            fw={600}
            lh={1}
            // onClick={(event) => event.preventDefault()}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
        // @ts-expect-error unsure
        <Flex justify={'space-between'} align={'center'} className={classes["inner"]}>
            <Text> We are a lab committed to getting students active in design </Text>


            <Group>{items}</Group>

            <Group gap="xs" justify="flex-end" wrap="nowrap">
                <Text c='red'>1185 Perry St, Blacksburg, VA 24060</Text>
                <Text c='red'>Room 236</Text>
            </Group>
        </Flex>
    );
}
