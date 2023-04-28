import React, { useState } from "react";
import { promises as fs } from 'fs'
import YAML from 'yaml'
import Box from "@/comps/Box/Box.jsx"
import SearchBar from "@/comps/SearchBar/searchbar.jsx"

import Gibbons from "../../public/Headshots/Gibbons.jpg"

export default function Projects({ projects }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  var count = 0;

  return (
    <div>
      <SearchBar setExternalSearchTerm={setSearchTerm} setExternalFilterType={setFilterType} />
      <div className="flex flex-wrap justify-center min-h-screen">
        {
          Object.keys(projects).map((key) => {
            if (searchTerm == "" && filterType == "") {
              count = 1;
              return (
                <div className="w-screen h-fit sm:w-6/12" key={key}>
                  <Box key={key} name={key} branch={projects[key]['branch']} href={projects[key]['url']} />
                </div>
              )
            }
            else // This is where we implement the search
            {
              // Option 1: Mentor. See searchbar.jsx for more details
              try {
                if (filterType == "option1" && projects[key]['mentor_last_name'].includes(searchTerm)) {
                  count++;
                  return (
                    <div className="w-screen h-fit sm:w-6/12" key={key}>
                      <Box key={key} name={key} branch={projects[key]['branch']} href={projects[key]['url']} />
                    </div>
                  )
                }
                else if (filterType == "option2" && key.includes(searchTerm)) {
                  count++;
                  return (
                    <div className="w-screen h-fit sm:w-6/12" key={key}>
                      <Box key={key} name={key} branch={projects[key]['branch']} href={projects[key]['url']} />
                    </div>
                  )
                }
              } catch (error) {
                console.log("Search Error " + error);
              }
            }
          })
        }
        {
          count == 0 ? <p className="p-20 h-screen">No such projects avalible. Did you select a filer?</p> : <div></div>
        }
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const file = 'repos.yaml'
  const fileContents = await fs.readFile(process.cwd() + '/' + file, 'utf8')
  var projects = YAML.parse(fileContents);
  return { props: { projects } }
}