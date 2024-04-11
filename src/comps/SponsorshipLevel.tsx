import {
    Text,
    Divider,
    Group,
    Card,
    Title,
} from "@mantine/core";

export default function SponsorshipLevel({ level, price, perks = [], icon = null } : SponsorshipLevelProps) {

    return (
        <Card shadow="sm">
            <Group justify="space-between" align="center" >
                <Group
                    align="center"
                    justify="space-between"
                    ml={'20px'} >
                    {icon}
                    <Title order={5}>
                        {level}
                    </Title>
                </Group>
                <Text mr={'10px'}>
                    ${price}
                </Text>
            </Group>
            <Divider m={'10px'}/>
            {perks.map(perk => (<li key={perk}> {perk} </li>))}
        </Card>
    );
}

type SponsorshipLevelProps = {
    level: string;
    price: string;
    perks: string[];
    icon : React.ReactNode;
};
