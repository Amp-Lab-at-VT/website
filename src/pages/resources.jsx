//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";
import ReactMarkdown from "react-markdown";
import { promises as fs } from 'fs'
import rehypeRaw from "rehype-raw";

export default function UsefulLinks({fileContents}) {
  return (
    <div>
      <header class="App-standardPage">
        <div class = "App-pageHelper">
        <ReactMarkdown class="App-standardPage" rehypePlugins={[rehypeRaw]}>{fileContents}</ReactMarkdown>
        </div>
      </header>
    </div>
  );
}

export async function getStaticProps() {
  const file = 'resources.md'
  const fileContents = await fs.readFile( process.cwd() + '/markdowns/' + file, 'utf8')
  return {props: {fileContents}}
}

