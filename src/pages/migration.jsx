//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";
import ReactMarkdown from "react-markdown";
import { promises as fs } from "fs";
import rehypeRaw from "rehype-raw";
import Layout from "@/comps/layout.jsx";

function Migration({ fileContents }) {
  return (
    <div>
      <header class="App-standardPage">
        <div class="App-pageHelper">
          <ReactMarkdown class="App-standardPage" rehypePlugins={[rehypeRaw]}>
            {fileContents}
          </ReactMarkdown>
        </div>
      </header>
    </div>
  );
}
export async function getStaticProps() {
  const file = "migration.md";
  const fileContents = await fs.readFile(
    process.cwd() + "/docs/" + file,
    "utf8",
  );
  return { props: { fileContents } };
}

export default Layout(Migration);
