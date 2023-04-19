import { promises as fs } from 'fs'
import YAML from 'yaml'
import ProjectBox from "@/comps/ProjectBox/ProjectBox.jsx"
import Box from "@/comps/Box/Box.jsx"

import Gibbons from "../../public/Headshots/Gibbons.jpg"

export default function Projects({ projects }) {
  return (
    <div class="App">
      <header class="App-standardPage">
        <div class="App-pageHelper">
            {
              Object.keys(projects).map((key) => {
                return <Box key = {key} name={key} branch={projects[key]['branch']} href={projects[key]['url']}/>
              })
            }
        </div>
      </header>
    </div>
  );
}

export async function getStaticProps() {
  const file = 'repos.yaml'
  const fileContents = await fs.readFile(process.cwd() + '/' + file, 'utf8')
  var projects = YAML.parse(fileContents);
  return { props: { projects } }
}