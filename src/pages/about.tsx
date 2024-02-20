//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";
import Link from "next/link";
import { promises as fs } from "fs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { StaticProps } from "@/utils/types";

export default function About({ fileContents } : StaticProps<typeof getStaticProps>) {
    return (
        <div className="App">
            <header className="App-standardPage">
                <div className="App-pageHelper">
                    <ReactMarkdown className="App-standardPage" rehypePlugins={[rehypeRaw]}>
                        {fileContents}
                    </ReactMarkdown>
                    <Link className="btn" href="/Leadership">
                        Leadership Team
                    </Link>
                </div>
            </header>
        </div>
    );
}
export async function getStaticProps() {
    const file = "about.md";
    const fileContents = await fs.readFile(
        process.cwd() + "/docs/" + file,
        "utf8",
    );
    return { props: { fileContents } };
}
