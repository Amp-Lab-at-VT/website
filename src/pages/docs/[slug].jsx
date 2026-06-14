import fs from "fs";
import path from "path";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Paper, Typography, Container } from "@mui/material";
import Layout from "@/comps/layout.jsx";

// Page to render markdown content
function DocPage({ content, title }) {
  return (
    <Container className="min-h-screen" sx={{ pt: "10px" }}>
      <Typography variant="h5" gutterBottom>
        Document: {title}
      </Typography>
      <Paper style={{ padding: "20px", margin: "20px" }}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
      </Paper>
    </Container>
  );
}

// Generate paths for each markdown file
export async function getStaticPaths() {
  const docsDirectory = path.join(process.cwd(), "docs/general_documentation");
  const filenames = await fs.promises.readdir(docsDirectory);

  // Create a path for each file, replacing '.md' extension
  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return {
    paths,
    fallback: false, // Return 404 for paths not generated at build time
  };
}

// Fetch the markdown content for each document page
export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(
    process.cwd(),
    "docs/general_documentation",
    `${slug}.md`,
  );

  // Read the content of the markdown file
  const content = await fs.promises.readFile(filePath, "utf8");

  return {
    props: {
      content, // Pass the markdown content to the page
      title: slug, // Use the slug as the title
    },
  };
}

export default Layout(DocPage);
