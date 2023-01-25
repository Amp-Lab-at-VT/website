//https://react-icons.github.io/react-icons/icons?name=bs
import React, { useEffect } from "react";
import Navigation from "../../modules/Nav/Nav.jsx"
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import aboutMarkdown from "../../../assets/markdownDocs/people.md"

import "./leadership.css"

export default function About() {
  const [text, setText] = React.useState();

  useEffect(() => {
    fetch(aboutMarkdown)
      .then((response) => response.text())
      .then((text) => {
        setText(text);
      });
  }, []);

  return (
    <div class="App">
      <header class="App-header">
        <Navigation></Navigation>
        <div class="App"></div>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{text}</ReactMarkdown>
      </header>
    </div>
  );
}

