import { useEffect, useState } from "react";
import axios from "axios";
import YAML from 'yaml'
import ProjectBox from "@/comps/ProjectBox/ProjectBox.jsx"

export default function Projects({ projects }) {
  
  return (
    <div class="App">
      <header class="App-standardPage">
        <div class="App-pageHelper">
        <text>Projects</text>
          <div class="flex-row-wrap">
            {
              Object.keys(projects).map((key) => {
                return <ProjectBox key = {key} name={key} branch={projects[key]['branch']} href={projects[key]['url']}/>
              })
            }
          </div>
        </div>
      </header>
    </div>
  );
}

