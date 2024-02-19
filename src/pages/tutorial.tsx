//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";
import ReactMarkdown from "react-markdown";
import { promises as fs } from "fs";
import rehypeRaw from "rehype-raw";
import { StaticProps } from "@/utils/types";

export default function Tutorial({ fileContents } : StaticProps<typeof getStaticProps>) {
    return (
        <div>
            <header className="App-standardPage">
                <div className="App-pageHelper tutorialText">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {fileContents}
                    </ReactMarkdown>
                </div>
            </header>
        </div>
    );
}

export async function getStaticProps() {
    const file = "tutorial.md";
    const fileContents = await fs.readFile(
        process.cwd() + "/docs/" + file,
        "utf8",
    );
    return { props: { fileContents } };
}
