//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";
import { promises as fs } from 'fs'
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import "@/pages/SolderingBasic/basic_soldering.module.css"

export default function BasicSoldering({fileContents}) {
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
  const file = 'basic_soldering.md'
  const fileContents = await fs.readFile( process.cwd() + '/markdowns/' + file, 'utf8')
  return {props: {fileContents}}
}

