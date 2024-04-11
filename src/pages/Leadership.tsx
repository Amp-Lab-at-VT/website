import LeadershipBox from "@/comps/LeadershipBox";
import { Container, Divider, Group, Space, Title } from "@mantine/core";


export default function Leadership() {
    return (
        <Container size={'95%'}>
            <Title order={2}>Meet Our Team: Student Staff</Title>
            <Divider />
            <Group>
                <LeadershipBox
                    name="Richard Gibbons"
                    src={'/Headshots/Gibbons.jpg'}
                    title="Richard Gibbons"
                    role="Team Lead"
                    email="gricha1@vt.edu" />
                <LeadershipBox
                    name="Henry Forsyth"
                    src={'/Headshots/Forsyth2.jpg'}
                    title="Henry Forsyth"
                    role="Mentor/Webdev"
                    email="rhforsythjr@vt.edu" />
                <LeadershipBox
                    name="Eddie Pritchard"
                    src={'/Headshots/Pritchard.jpeg'}
                    title="Eddie Pritchard"
                    role="Mentor"
                    email="epritchard@vt.edu" />
                <LeadershipBox
                    name="Purv Bavishi"
                    src={'/Headshots/pb.jpeg'}
                    title="Purv Bavishi"
                    role="Mentor"
                    email="purvbavishi@vt.edu" />
                <LeadershipBox
                    name="Ethan James"
                    src={'/Headshots/Ethan.jpg'}
                    title="Ethan James"
                    role="Mentor"
                    email="ethanjamesauto@vt.edu" />
            </Group>
            <Space h='xl'/>
            <Title order={2}>Meet Our Team: Professors</Title>
            <Divider />
            <Group>
                <LeadershipBox
                    name="William Baumann"
                    src={'/Headshots/Baumann.jpg'}
                    title="Dr.William Baumann"
                    email="baumann@vt.edu" />
                <LeadershipBox
                    name="Toby Meadows"
                    src={'/Headshots/Meadows.jpg'}
                    title="Dr.Toby Meadows"
                    email="toby88@vt.edu" />
            </Group>
        </Container>
    );
}
