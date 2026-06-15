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

      <Paper sx={{ p: 3, my: 3 }}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {content}
        </ReactMarkdown>
      </Paper>
    </Container>
  );
}

// Generate pages ONLY for markdown files
export async function getStaticPaths() {
  const docsDirectory = path.join(
    process.cwd(),
    "docs/general_documentation"
  );

  const filenames = await fs.promises.readdir(docsDirectory);

  const paths = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => ({
      params: {
        slug: filename.replace(".md", ""),
      },
    }));

  return {
    paths,
    fallback: false,
  };
}

// Load markdown content
export async function getStaticProps({ params }) {
  const { slug } = params;

  const filePath = path.join(
    process.cwd(),
    "docs/general_documentation",
    `${slug}.md`
  );

  // Safety check in case the file doesn't exist
  if (!fs.existsSync(filePath)) {
    return {
      notFound: true,
    };
  }

  const content = await fs.promises.readFile(filePath, "utf8");

  return {
    props: {
      content,
      title: slug,
    },
  };
}

export default Layout(DocPage);