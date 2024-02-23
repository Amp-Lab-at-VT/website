import {Anchor, Flex, Group, Text} from "@mantine/core";
import classes from "./Footer.module.css";
import Link from "next/link";


const links = [
    { link: '/getting_started', label: 'Getting Started' },
    { link: '/Leadership', label: 'Leadership' },
];

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
        <Flex justify={'space-between'} align={'center'} className={classes.inner}>

            <>LOGO HERE</>

            <Text> We are a lab committed to getting students active in design </Text>

            <Group className={classes.links}>{items}</Group>

            <Group gap="xs" justify="flex-end" wrap="nowrap">
                <Text c='red'>1185 Perry St, Blacksburg, VA 24060</Text>
                <Text c='red'>Room 236</Text>
            </Group>
        </Flex>
    );
}
