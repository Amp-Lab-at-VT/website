//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";
import Link from "next/link";
import { promises as fs } from "fs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Layout from "@/comps/layout.jsx";
import { Box, Button, Container } from "@mui/material";

function About({ fileContents }) {
  return (
    <Container>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{fileContents}</ReactMarkdown>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        href="/Leadership"
      >
        Leadership Team
      </Button>
    </Container>
  );
}

export async function getStaticProps() {
  const file = "about.md";
  const fileContents = await fs.readFile(
    process.cwd() + "/docs/" + file,
    "utf8",
  );
  return { props: { fileContents } };
}

export default Layout(About);
