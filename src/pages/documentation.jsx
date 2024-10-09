import fs from "fs";
import path from "path";
import React from "react";
import { useRouter } from "next/router";
import Layout from "@/comps/layout.jsx";

import ArticleIcon from "@mui/icons-material/Article";
import {
  Paper,
  Typography,
  Button,
  Box,
  Stack,
  Container,
} from "@mui/material";

// Custom component for document card
function IconAndName({ icon, title, buttonTitle, color, onClick }) {
  return (
    <Paper
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px", // Reduced padding
        margin: "5px", // Reduced margin
        width: "250px", // Adjusted width
        height: "250px", // Adjusted height
        backgroundColor: color,
        borderRadius: "8px",
        cursor: "pointer",
        textAlign: "center", // Center the text
      }}
      onClick={onClick}
    >
      {icon}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>{" "}
      {/* Adjusted typography */}
      <Button size="small" color="primary">
        {buttonTitle}
      </Button>{" "}
      {/* Smaller button */}
    </Paper>
  );
}

function Documentation({ files }) {
  const router = useRouter();

  return (
    <Container className="min-h-screen">
      <div className="min-h-screen">
        <div>
          <h1 className="m-5">Documentation:</h1>
          <p className="text-left m-5">
            Below is a list of documentation for the lab. Select one to get
            started!
          </p>
        </div>

        {/* Container that uses Box for wrapping */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start", // Aligns items to the left
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            sx={{
              flexWrap: "wrap", // Allows items to wrap
            }}
          >
            {files.map((file, index) => (
              <IconAndName
                key={index}
                icon={<ArticleIcon />}
                title={file}
                buttonTitle="View Document"
                color="#f9f9f9"
                onClick={() => router.push(`/docs/${file.replace(".md", "")}`)} // Redirect on click
              />
            ))}
          </Stack>
        </Box>
      </div>
    </Container>
  );
}

// Fetch the list of files in the directory
export async function getStaticProps() {
  const docsDirectory = path.join(process.cwd(), "docs/general_documentation");

  // Get a list of all the files in the docs directory
  const files = await fs.promises.readdir(docsDirectory);

  return { props: { files } };
}

export default Layout(Documentation);
