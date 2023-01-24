import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown'
import YAML from 'yaml'

import Navigation from "../../modules/Nav/Nav.jsx"

import "./projects.css"

export default function Projects() {
  const url =
    "https://raw.githubusercontent.com/Amp-Lab-at-VT/AmpWebV2/master/repos.yaml";
  const [read, setRead] = useState(null);
  const [importedYaml, setImportedYaml] = useState(null);
  const [projects, setProjects] = useState([]);


  useEffect(() => {
    axios.get(url).then((response) => {
      setRead(response.data);
      var items = YAML.parseDocument(response.data).contents.items;
      console.log(items)
      for (var item in items){
        console.log(item.key.value)
      }
    });
  }, []);

  return (
    <div class="App">
      <header class="App-header">
        <Navigation></Navigation>
        <text>Projects</text>
        <div className="App">
          <ReactMarkdown>{YAML.stringify(importedYaml)}</ReactMarkdown>
        </div>
      </header>
    </div>
  );
}

