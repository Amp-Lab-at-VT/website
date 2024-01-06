//https://react-icons.github.io/react-icons/icons?name=bs
import { promises as fs } from 'fs'
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function Rules({fileContents}) {
  return (
    <div>
        <div class = "App-pageHelper">
        <ReactMarkdown class="App-standardPage" rehypePlugins={[rehypeRaw]}>{fileContents}</ReactMarkdown>
        </div> 
    </div>
  );
}

export async function getStaticProps() {
  const file = 'rules.md'
  const fileContents = await fs.readFile( process.cwd() + '/docs/' + file, 'utf8')
  return {props: {fileContents}}
}

