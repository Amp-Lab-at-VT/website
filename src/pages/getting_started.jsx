//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";
import { promises as fs } from 'fs'
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { FaReact } from 'react-icons/fa';

import IconAndName from "@/comps/IconAndName/IconAndName";

export default function GettingStarted({fileContents}) {
return (
    <div className="App">
      <IconAndName icon ={<FaReact> </FaReact>} title = "Getting Started: New Members" buttonTitle = "Click here to begin" color = "#f9f9f9"></IconAndName>
      <header className="App-standardPage">
       <div className="App-pageHelper">
        <ReactMarkdown class="App-standardPage" rehypePlugins={[rehypeRaw]}>{fileContents}</ReactMarkdown>
        </div>
      </header>
    </div>
  );
}

export async function getStaticProps() {
  const file = 'quickstart.md'
  const fileContents = await fs.readFile( process.cwd() + '/markdowns/' + file, 'utf8')
  return {props: {fileContents}}
}