import React, { useState } from "react";
import { promises as fs } from 'fs'
import YAML from 'yaml'
import Box from "@/comps/Box/Box.jsx"
import SearchBar from "@/comps/SearchBar/searchbar.jsx"

export default function Projects({ activeProjects, inactiveProjects, activeCount, inactiveCount }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  var enableSearch = searchTerm;

  var activeProjectsInSearch = 0;
  var inactiveProjectsInSearch = 0;
//aaklsjdaklwjndqIOPDWQlwdhqoj MAKIONGH A RANDOM CHANGE FOR GIT LAKSDML;ASJDSA;MDKLSAMD
//aaklsjdaklwjndqIOPDWQlwdhqoj MAKIONGH A RANDOM CHANGE FOR GIT LAKSDML;ASJDSA;MDKLSAMD
//aaklsjdaklwjndqIOPDWQlwdhqoj MAKIONGH A RANDOM CHANGE FOR GIT LAKSDML;ASJDSA;MDKLSAMD
//aaklsjdaklwjndqIOPDWQlwdhqoj MAKIONGH A RANDOM CHANGE FOR GIT LAKSDML;ASJDSA;MDKLSAMD
//aaklsjdaklwjndqIOPDWQlwdhqoj MAKIONGH A RANDOM CHANGE FOR GIT LAKSDML;ASJDSA;MDKLSAMD
//aaklsjdaklwjndqIOPDWQlwdhqoj MAKIONGH A RANDOM CHANGE FOR GIT LAKSDML;ASJDSA;MDKLSAMD
//aaklsjdaklwjndqIOPDWQlwdhqoj MAKIONGH A RANDOM CHANGE FOR GIT LAKSDML;ASJDSA;MDKLSAMD
//aaklsjdaklwjndqIOPDWQlwdhqoj MAKIONGH A RANDOM CHANGE FOR GIT LAKSDML;ASJDSA;MDKLSAMD
//aaklsjdaklwjndqIOPDWQlwdhqoj MAKIONGH A RANDOM CHANGE FOR GIT LAKSDML;ASJDSA;MDKLSAMD
//aaklsjdaklwjndqIOPDWQlwdhqoj MAKIONGH A RANDOM CHANGE FOR GIT LAKSDML;ASJDSA;MDKLSAMD
//aaklsjdaklwjndqIOPDWQlwdhqoj MAKIONGH A RANDOM CHANGE FOR GIT LAKSDML;ASJDSA;MDKLSAMD

  return (
    <div>
      <SearchBar setExternalSearchTerm={setSearchTerm} setExternalFilterType={setFilterType} />
      <div className="flex flex-wrap justify-center min-h-screen">
        {/* Default for when seach is disabled */}
        {
          (!enableSearch) ?
            <div id="defaultWithoutSearch" className="m-0">
              {/* Active Projets */}
              {activeCount > 0 ?
                <div>
                  <div className=" p-2 bg-green-500 flex"><h1 className = "m-4">Active Projects</h1></div>
                  <div className="flex flex-wrap justify-center">
                    {Object.keys(activeProjects).map((key) => {
                      return (
                        <div className="w-screen h-fit sm:w-6/12" key={key}>
                          <Box key={key} name={key} branch={activeProjects[key]['branch']} href={activeProjects[key]['url']} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                :
                <div></div>
              }

              {/* Inactive Projects */}
              {inactiveCount > 0 ?
                <div>
                  <div className=" p-2 bg-red-500 flex"><h1 className = "m-4">Inactive Projects (No Commits in 90 Days)</h1></div>
                  <div className="flex flex-wrap justify-center">
                    {Object.keys(inactiveProjects).map((key) => {
                      return (
                        <div className="w-screen h-fit sm:w-6/12" key={key}>
                          <Box key={key} name={key} branch={inactiveProjects[key]['branch']} href={inactiveProjects[key]['url']} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                :
                <div></div>
              }
            </div>
            : null
        }

        {/* Search is enabled */}
        {
          ((enableSearch && filterType)) ?
            <div className="m-0">
              {/* Active Projets */}
              {activeCount > 0 ?
                <div>
                  <div className=" p-2 bg-green-500 flex"><h1 className = "m-4">Active Projects</h1></div>
                  <div className="flex flex-wrap justify-center">
                    {filterType != "" ?
                      Object.keys(activeProjects).map((key) => {
                        if (((filterType == "option1" && activeProjects[key]['mentor_last_name'].includes(searchTerm)) ||
                          (filterType == "option2" && key.includes(searchTerm)))) {
                          activeProjectsInSearch++;
                          return (
                            <div className="w-screen h-fit sm:w-6/12" key={key}>
                              <Box key={key} name={key} branch={activeProjects[key]['branch']} href={activeProjects[key]['url']} />
                            </div>
                          );
                        }
                      })
                      :
                      null
                    }
                    {
                    activeProjectsInSearch == 0 ?
                    <p className = "p-20"> No active projects for your search term <b>"{searchTerm}"</b></p>
                    : null}
                  </div>
                </div>

                :
                <div></div>
              }

              {/* Inactive Projects */}
              {inactiveCount > 0 ?
                <div>
                  <div className=" p-2 bg-red-500 flex"><h1 className = "m-4">Inactive Projects (No Commits in 90 Days)</h1></div>
                  <div className="flex flex-wrap justify-center">
                    {filterType != "" ?
                      Object.keys(inactiveProjects).map((key) => {
                        if (((filterType == "option1" && inactiveProjects[key]['mentor_last_name'].includes(searchTerm)) ||
                          (filterType == "option2" && key.includes(searchTerm)))) {
                          inactiveProjectsInSearch++;
                          return (
                            <div className="w-screen h-fit sm:w-6/12" key={key}>
                              <Box key={key} name={key} branch={inactiveProjects[key]['branch']} href={inactiveProjects[key]['url']} />
                            </div>
                          );
                        }
                      })
                      :
                      null
                    }
                    {inactiveProjectsInSearch == 0 ?
                    <p className = "p-20"> No inactive projects for your search term <b>"{searchTerm}"</b></p>
                    : null}
                  </div>
                </div>
                :
                null
              }
            </div>
            : <div></div>
        }

        {/* Search with no filter  */}
        {
          ((enableSearch && !filterType)) ?
            <div className="m-0">
              <p>Please select a filter to run your search</p>
            </div>
            : null
        }
      </div>
    </div>
  );
}

export async function getStaticProps() {

  var activeCount = 0, inactiveCount = 0;

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
      // increase the count of inactive projects
      inactiveCount = inactiveCount + 1;
    }
    else {
      activeProjects[key] = projects[key];
      // increase the count of active projects
      activeCount = activeCount + 1;
    }
  }

  console.log("activeCount: " + activeCount);
  console.log("inactiveCount: " + inactiveCount);

  return { props: { activeProjects, inactiveProjects, activeCount, inactiveCount } }
}