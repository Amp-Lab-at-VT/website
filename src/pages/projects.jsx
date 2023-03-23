import { promises as fs } from 'fs'
import YAML from 'yaml'
import ProjectBox from "@/comps/ProjectBox/ProjectBox.jsx"

export default function Projects({ projects }) {

  console.log(JSON.stringify(projects))


  return (
    <div class="App">
      <header class="App-standardPage">
        <div class="App-pageHelper">
          <text>Projects</text>
          <div class="flex-row-wrap">
            {
              Object.keys(projects).map((key) => {
                return <ProjectBox name={key} branch={projects[key]['branch']} href={projects[key]['url']}/>
              })
            }
          </div>
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