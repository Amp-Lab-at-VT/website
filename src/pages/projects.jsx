import React, { useState } from "react";
import { promises as fs } from 'fs'
import YAML from 'yaml'
import Box from "@/comps/Box/Box.jsx"
import Head from 'next/head'

export default function Projects({ activeProjects, inactiveProjects, activeCount, inactiveCount }) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchFilter = (dict) => {
    return Object.keys(dict).filter((key) => {
      const exclude = /\-\w*/g.exec(key); // regex to find the -[name] in the project name
      if (key.toLowerCase().includes(exclude)) return false;
      if (searchTerm.toLowerCase().includes("mentor:")) {
        return dict[key]['mentor_last_name'].toLowerCase().includes(searchTerm.split("mentor:")[1].toLowerCase()) && key.toLowerCase().includes(searchTerm.split("mentor:")[0].toLowerCase())
      } // this only works if the title is first and the "mentor:" is second.
      else {
        return key.toLowerCase().includes(searchTerm.toLowerCase())
      }

    }).reduce((obj, key) => {
      obj[key] = dict[key];
      return obj;
    }, {});
  };

  //Applying our search filter function to our dictionary of projects recieved from the API
  const filteredActive = searchFilter(activeProjects)
  const filteredInact = searchFilter(inactiveProjects)

  //Handling the input on our search bar
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }


  return (
    <div className={`bg-gray-100`}>
      <Head>
        <title>Projects</title>
        <meta name="description" content="Projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Search Bar */}
      <div className='w-11/12 p-5 flex flex-col  md:items-center'>
        <input className="text-sm py-3 w-[30rem] rounded pl-10 shadow-lg focus:outline-none" onChange={handleChange} type='text' placeholder='Search...' />
      </div>

      {/* Active Projects */}
      <div className="p-1 flex"><h1 className="m-4">Active Projects</h1></div>
      <div className='m-5 flex flex-wrap justify-center'>
        {Object.keys(filteredActive).map((key) => {
          return (<div className="w-screen h-fit sm:w-6/12" key={key}><Box key={key} name={key} branch={activeProjects[key]['branch']} href={activeProjects[key]['url']} /></div>)
        })}
      </div>

      {/* Inactive Projects */}
      <div className="p-1flex"><h1 className="m-4">Inactive Projects</h1></div>
      <div className='m-5 flex flex-wrap justify-center'>
        {Object.keys(filteredInact).map((key) => {
          return (<div className="w-screen h-fit sm:w-6/12" key={key}><Box key={key} name={key} branch={inactiveProjects[key]['branch']} href={inactiveProjects[key]['url']} /></div>)
        })}
      </div>

    </div>
  )
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
      console.log("Inactive: " + key);
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
