//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";
import Link from "next/link";
import { promises as fs } from "fs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function Mentor_Checksheet({ fileContents }) {
  return (
    <div className="App">
      <header className="App-standardPage">
        <div className="App-pageHelper">
          <ReactMarkdown class="App-standardPage" rehypePlugins={[rehypeRaw]}>
            {fileContents}
          </ReactMarkdown>
        </div>
      </header>
    </div>
  );
}
export async function getStaticProps() {
  const file = "mentor_checksheet.md";
  const fileContents = await fs.readFile(
    process.cwd() + "/docs/" + file,
    "utf8",
  );
  return { props: { fileContents } };
}
