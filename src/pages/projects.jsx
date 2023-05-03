import React, { useState } from "react";
import { promises as fs } from 'fs'
import YAML from 'yaml'
import Box from "@/comps/Box/Box.jsx"
import SearchBar from "@/comps/SearchBar/searchbar.jsx"

import Gibbons from "../../public/Headshots/Gibbons.jpg"

export default function Projects({ activeProjects, inactiveProjects }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  var activeCount = 0;
  var inactiveCount = 0;

  return (
    <div>
      <SearchBar setExternalSearchTerm={setSearchTerm} setExternalFilterType={setFilterType} />
      {/* Green bar that says active */}
      <div className="flex flex-wrap justify-center">
      {((!searchTerm) && Object.keys(activeProjects).length) ? <div className="w-screen h-20 bg-green-500 p-2"><h1>Active Projects</h1></div> : <div></div>}
        {
          Object.keys(activeProjects).map((key) => {
            if (searchTerm == "" && filterType == "") {
              activeCount = 1;
              return (
                <div className="w-screen h-fit sm:w-6/12" key={key}>
                  <Box key={key} name={key} branch={activeProjects[key]['branch']} href={activeProjects[key]['url']} />
                </div>
              )
            }
            else // This is where we implement the search
            {
              // Option 1: Mentor. See searchbar.jsx for more details
              try {
                if (filterType == "option1" && activeProjects[key]['mentor_last_name'].includes(searchTerm)) {
                  activeCount++;
                  return (
                    <div className="w-screen h-fit sm:w-6/12" key={key}>
                      <Box key={key} name={key} branch={activeProjects[key]['branch']} href={activeProjects[key]['url']} />
                    </div>
                  )
                }
                else if (filterType == "option2" && key.includes(searchTerm)) {
                  activeCount++;
                  return (
                    <div className="w-screen h-fit sm:w-6/12" key={key}>
                      <Box key={key} name={key} branch={activeProjects[key]['branch']} href={activeProjects[key]['url']} />
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
          activeCount == 0 ? <p className="p-20 h-screen">No such projects avalible. Did you select a filter?</p> : <div></div>
        }
      </div>
      {/* Inactive Project Section */}
      {/* Get length of inactive projects */}

      {((!searchTerm) && Object.keys(inactiveProjects).length) ?      
      <div className="w-100% h-20 bg-red-500 p-2">
      <h1>Inactive Projects (No commits in 90 days)</h1>
      </div> : <div></div>}

      {inactiveProjects ? 
  <div>
    <div className="flex flex-wrap justify-center">
      {Object.keys(inactiveProjects).map((key) => {
        inactiveCount = 1;
        if (searchTerm === "" && filterType === "") {
          return (
            <div className="w-screen h-fit sm:w-6/12" key={key}>
              <Box key={key} name={key} branch={inactiveProjects[key]['branch']} href={inactiveProjects[key]['url']} />
            </div>
          );
        }
        else
        {
          return (<p key={key}>No inactive projects</p>);
        }
      })}
    </div>
  </div>
  : <div></div>
}

  
  
    </div>
  );
}

export async function getStaticProps() {
  const file = 'repos.yaml'
  const fileContents = await fs.readFile(process.cwd() + '/' + file, 'utf8')
  var projects = YAML.parse(fileContents);

  var inactiveProjects = {};
  var activeProjects = {};

  // Find the date of each commit, and add it to the project
  for (var key in projects) {
    var url = projects[key]['url'];
    var branch = projects[key]['branch'];
    var repo = url.split("/")[4];
    var owner = url.split("/")[3];

    // Pull the date from the commit
    var date = await fetch("https://api.github.com/repos/" + owner + "/" + repo + "/commits/" + branch)
      .then((response) => response.json())
      .then((data) => {
        // Add the date to the project
        projects[key]['date'] = data['commit']['committer']['date'];
        // return data['commit']['committer']['date'];
      })
      .catch((error) => {
        console.log("Odds are your query is being throttled. Try again in a few minutes.")
      });
  }

  // Sort the projects by date
  projects = Object.fromEntries(
    Object.entries(projects).sort(([, a], [, b]) => {
      return new Date(b['date']) - new Date(a['date']);
    })
  );

  // if a project hasn't been updates in 3 months, move it to inactive
  for (var key in projects) {
    var date = new Date(projects[key]['date']);
    var today = new Date();
    var diffTime = Math.abs(today - date);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 90) {
      inactiveProjects[key] = projects[key];
      console.log("Inactive: " + key);
    }
    else {
      activeProjects[key] = projects[key];
    }
  }
  
  return { props: { activeProjects,  inactiveProjects} }
}