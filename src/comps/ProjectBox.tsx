import ReactMarkdown from "react-markdown";
import { useHover } from "@mantine/hooks";
import Link from "next/link";
import { AspectRatio, Overlay, Text, Image, Stack} from "@mantine/core";
import type { GraphQLResult } from "@/utils/types";


export default function Box({ name, project } : { project: GraphQLResult[string], name : string} ) {
    const baseURI = `https://raw.githubusercontent.com/${project["url"].split('github.com/')[1]}/${project.defaultBranchRef.name}`;
    const imgPath = `${baseURI}/hero.png`;
    const fullSummary = project.defaultBranchRef.target.tree.entries?.find((entry) => entry.name === "summary.md")?.object.text ?? "No Summary Avalible";

    console.log(project, baseURI, imgPath, fullSummary);

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
                        <Text className="text-2xl bg-black text-white p-2">{name}</Text>
                        <ReactMarkdown>{fullSummary}</ReactMarkdown>
                    </Stack>
                </Overlay>
            )}
        </AspectRatio>
    );
}
