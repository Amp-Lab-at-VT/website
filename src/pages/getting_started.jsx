//https://react-icons.github.io/react-icons/icons?name=bs
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function GettingStarted() {
  const [text, setText] = React.useState();

  // useEffect(() => {
  //   fetch(aboutMarkdown)
  //     .then((response) => response.text())
  //     .then((text) => {
  //       setText(text);
  //     });
  // }, []);

  return (
    <div>
      <header class="App-standardPage">
        <div class = "App-pageHelper">
          <ReactMarkdown class="App-standardPage">{text}</ReactMarkdown>
        </div>
      </header>
    </div>
  );
}

