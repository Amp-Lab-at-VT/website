//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";
import ReactMarkdown from "react-markdown";
import { promises as fs } from 'fs'
import rehypeRaw from "rehype-raw";

export default function Tutorial({ fileContents }) {
  return (
    <div>
      <header className="App-standardPage">
        <div className="App-pageHelper tutorialText">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{fileContents}</ReactMarkdown>
        </div>
      </header>
    </div>
  );
}

export async function getStaticProps() {
  const fileContents = await fs.readFile(process.cwd() + '/markdowns/tutorial.md', 'utf8')
  return { props: { fileContents } }
}

