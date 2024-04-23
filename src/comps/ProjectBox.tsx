import { AspectRatio, Overlay, Image, Stack, Title, Group, Container} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import Link from "next/link";
import type { GraphQLResult } from "@/utils/types";


export default function Box({ project } : { project: GraphQLResult[string]} ) {
    const baseURI = `https://raw.githubusercontent.com/${project["url"].split('github.com/')[1]}/${project.defaultBranchRef.name}`;
    const imgPath = `${baseURI}/hero.png`;
    const Summary = project.defaultBranchRef.target.tree.entries?.find((entry) =>
        entry.name === "summary.md")?.object.text.split('Summary')[1].split('# Date Started')[0]
        ?? "No Summary Avalible";

    console.log(project, baseURI, imgPath);


    const { hovered, ref } = useHover();

    return (
        <AspectRatio ratio={2}
            component={Link}
            // @ts-expect-error not sure why this line is throwing an error. you can probably ignore it
            href={project.url}
            ref={ref} >
            <Image src={imgPath} alt="" />
            {hovered && (
                <Overlay color="#000" backgroundOpacity={0.65} >
                    <Stack gap={'xs'}>
                        <Group justify="center">
                            <Title order={2}>{project.name}</Title>
                        </Group>
                        <Container>
                            <Title order={6} lineClamp={5} fw={400} fz={'sm'}>{Summary}</Title>
                        </Container>

                    </Stack>
                </Overlay>
            )}
        </AspectRatio>
    );
}
