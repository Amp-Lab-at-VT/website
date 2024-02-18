//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";
import ReactMarkdown from "react-markdown";
import { promises as fs } from "fs";
import rehypeRaw from "rehype-raw";

export default function BeginnersGuide({ fileContents }) {
  return (
    <div className="h-screen">
      <div className="m-5">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {fileContents}
        </ReactMarkdown>{" "}
        {/* Render Markdown */}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const file = "basic_soldering.md";
  const fileContents = await fs.readFile(
    process.cwd() + "/docs/" + file,
    "utf8",
  );
  return { props: { fileContents } };
}
