//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";
import Link from "next/link";
import { promises as fs } from "fs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Layout from "@/comps/layout.jsx";

import { Typography } from "@mui/material";

function Clean({ fileContents }) {
  return (
    <div className="App">
      <header className="App-standardPage">
        <div className="App-pageHelper">
          <ReactMarkdown class="App-standardPage" rehypePlugins={[rehypeRaw]}>
            {fileContents}
          </ReactMarkdown>

          <Typography variant="h4" component="h4" gutterBottom>
            For any more questions, contact the leadership team below!
          </Typography>
          <Link className="btn" href="/Leadership">
            Leadership Team
          </Link>
        </div>
      </header>
    </div>
  );
}
export async function getStaticProps() {
  const file = "cleaning_standards.md";
  const fileContents = await fs.readFile(
    process.cwd() + "/docs/" + file,
    "utf8",
  );
  return { props: { fileContents } };
}

export default Layout(Clean);
