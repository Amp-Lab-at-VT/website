// import { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { useHover } from "@mantine/hooks";
// import Link from "next/link";
// import { AspectRatio, Overlay, Text, Image, Paper, Stack} from "@mantine/core";


export default function Box({ name="Sample", branch="main", href="https://github.com/Amp-Lab-at-VT/SampleProject" }) {

    return null;
    // const { hovered, ref } = useHover();


    // const getDifference = (str1 : string, str2 : string) => {
    //     let diff = "";
    //     str2.split("").forEach(function (val, i) {
    //         if (val !== str1.charAt(i)) diff += val;
    //     });
    //     return diff;
    // };

    // const diff = getDifference("https://github.com/", href);
    // const fullSummary = `https://raw.githubusercontent.com/${diff}/${branch}/summary.md`;
    // const imgPath = `https://raw.githubusercontent.com/${diff}/${branch}/hero.png`;

    // // Pull text from fullSummary url
    // const [text, setText] = useState("No Summary Avalible");

    // fetch(fullSummary)
    //     .then((response) => {
    //         if (response.status < 300 && response.status >= 200)
    //             return response.text();
    //         throw new Error();
    //     })
    //     .then((response) =>  { return setText(response) })
    //     .catch((response) => {console.log(`Project is not avalibe at that address. Warning: ${response}`)});

    // return (
    //     <AspectRatio ratio={2} ref={ref}
    //         // href={href}
    //         component={Link}>
    //         {!hovered &&
    //             <Overlay>
    //                 <Paper color="black">
    //                     <Text>{name}</Text>
    //                 </Paper>
    //             </Overlay>}

    //         <Image src={imgPath} alt="" />
    //         {hovered && (
    //             <Overlay color="#000" backgroundOpacity={0.85} >
    //                 <Stack gap={'xs'}>
    //                     <Text className="text-2xl bg-black text-white p-2">{name}</Text>
    //                     <ReactMarkdown>{text}</ReactMarkdown>
    //                 </Stack>
    //             </Overlay>
    //         )}
    //     </AspectRatio>
    // );
}
