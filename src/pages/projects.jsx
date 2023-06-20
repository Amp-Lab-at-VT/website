import React, { useState } from "react";
import { promises as fs } from 'fs'
import YAML from 'yaml'
import Box from "@/comps/Box/Box.jsx"
import Head from 'next/head'
import { graphql } from "@octokit/graphql";

export default function Projects({ activeProjects, inactiveProjects }) {
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
        {Object.entries(filteredActive).map(([key, value]) => { return (<Box key={value['owner']} owner={value['owner']} imgPath={value['imgUrl']} name={value['name']} text={value['text']} />) })}
      </div>

      {/* Inactive Projects */}
      <div className="p-1flex"><h1 className="m-4">Inactive Projects</h1></div>
      <div className='m-5 flex flex-wrap justify-center'>
        {Object.entries(filteredInact).map(([key, value]) => { return (<Box key={value['owner']} owner={value['owner']} imgPath={value['imgUrl']} name={value['name']} text={value['text']} />) })}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const fileContents = await fs.readFile(process.cwd() + "/repos.yaml", 'utf8')
  var projects = YAML.parse(fileContents);

  var inactiveProjects = {};
  var activeProjects = {};
  const repositories = [];

  // Find the date of each commit, and add it to the project
  for (var key in projects) {
    var url = projects[key]['url'];
    var branch = projects[key]['branch']; // not needed (probably) since the graphql query gets commit date on all branches and default branch name too
    var repo = url.split("/")[4];
    var owner = url.split("/")[3];

    repositories.push({ owner: owner, repo: repo, branch: branch, name: key });
  }

  // GraphQL query
  // This query will get the last commit date *on all branches*, the summary.md file, and the name of the repo
  // fragments are used to avoid repeating the same query for each repo (get the same details for all repos)
  const query = `
  fragment repoDetails on Repository {
    nameWithOwner
    defaultBranchRef {
      name
        target {
          ... on Commit {
            summary: file(path: "summary.md") {
              object {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
      }
      refs(first: 100, refPrefix: "refs/heads/") {
        edges {
          node {
            target {
              ... on Commit {
                history(first: 1) {
                  edges {
                    node {
                      committedDate
                    }
                  }
                }
              }
            }
          }
        }
      }   
  } 
  
  { ${repositories.map(({ owner, repo }, index) => `repo${index + 1}: repository(owner: "${owner}", name: "${repo}") { ...repoDetails }`).join("\n")} } 
  `;

  const token = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  const result = await graphql(query, { headers: { authorization: `token ${token}`, } });

  const filtered = Object.entries(result).map(([, value]) => ({
    name: '',
    owner: value.nameWithOwner,
    lastCommit: value.refs.edges[0].node.target.history.edges[0].node.committedDate,
    imgUrl: "https://raw.githubusercontent.com/" + value.nameWithOwner + "/" + value.defaultBranchRef.name + "/hero.png",
    text: value.defaultBranchRef.target.summary.object.text,
  })
  ).sort((a, b) => b.lastCommit - a.lastCommit); // sort by most recent commit

  filtered.forEach(function (project) {

    // loop through the filtered repos and find the name of the project from the projects YAML file and add it to the object
    Object.keys(projects).forEach(key => {
      if (projects[key]['url'].split("github.com/")[1] === project.owner) {
        project.name = key;
        project.branch = projects[key]['branch'];
      }
    });

    // if any of the filtered projects haven't been updated in 3 months, move it to inactive list
    var diffDays = Math.ceil((new Date() - new Date(project.lastCommit)) / (1000 * 60 * 60 * 24));
    if (diffDays > 90) 
      inactiveProjects[project.name] = project;
    else 
      activeProjects[project.name] = project;
    
  });
  return { props: { activeProjects, inactiveProjects } }
}
