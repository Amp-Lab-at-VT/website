// Write me a component that renders a single sponsorship level

import React from "react";

import {
    Box,
    Text,
    Divider,
    Group,
    Card,
} from "@mantine/core";

export default function SponsorshipLevel({ level, price, perks = [], icon = null } : SponsorshipLevelProps) {

    return (
        <Card>
            <Group justify="space-between" align="center" >
                <Group
                    align="center"
                    justify="space-between"
                    ml={'20px'} >
                    <Box>{icon}</Box>
                    <Text ml={'10px'} variant="h6">
                        {level}
                    </Text>
                </Group>
                <Text mr={'10px'} variant="h6">
                    ${price}
                </Text>
            </Group>
            <Divider m={'10px'}/>
            {perks.map((perk) => (
                <li key={perk}> {perk} </li>
            ))}
        </Card>
    );
}

type SponsorshipLevelProps = {
    level: string;
    price: string;
    perks: string[];
    icon : React.ReactNode;
};
