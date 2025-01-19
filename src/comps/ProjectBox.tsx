"use client"
import { AspectRatio, Container, Group, Overlay, Stack, Title } from "@mantine/core";
import Image from 'next/image'
import { useHover } from "@mantine/hooks";
import Link from "next/link";
import type { Project } from "@/utils";

export default function Box({ project }: { project: Project }) {
    const baseURI = `https://raw.githubusercontent.com/${project["url"].split("github.com/")[1]}/${project.defaultBranchRef.name}`;
    const Summary = project.file?.text ?? "No Summary Available";

    const { hovered, ref } = useHover();

    return (
        <AspectRatio
            ratio={2}
            component={Link}
            // @ts-expect-error mantine did not set up polymorphic type for this
            href={project.url}
            ref={ref}
        >
            <Image src={`${baseURI}/hero.png`} alt="" />
            {hovered && (
                <Overlay color="#000" backgroundOpacity={0.65}>
                    <Stack gap={"xs"}>
                        <Group justify="center">
                            <Title order={2}>{project.name}</Title>
                        </Group>
                        <Container>
                            <Title order={6} lineClamp={5} fw={400} fz={"sm"}>
                                {Summary}
                            </Title>
                        </Container>
                    </Stack>
                </Overlay>
            )}
        </AspectRatio>
    );
}
