import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown'

import Navigation from "../../modules/Nav/Nav.jsx"

import "./projects.css"

export default function Projects() {
  const url =
    "https://raw.githubusercontent.com/Amp-Lab-at-VT/AmpWebV2/master/repos.md";
  const [read, setRead] = useState(null);

  useEffect(() => {
    axios.get(url).then((response) => {
      setRead(response.data);
    });
  }, []);

  return (
    <div class="App">
      <header class="App-header">
        <Navigation></Navigation>
        <text>Projects</text>
        <div className="App">
          <ReactMarkdown>{read}</ReactMarkdown>
        </div>
      </header>
    </div>
  );
}

