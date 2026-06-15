import fs from "fs";
import path from "path";
import React from "react";
import { useRouter } from "next/router";
import Layout from "@/comps/layout.jsx";

import ArticleIcon from "@mui/icons-material/Article";
import { useTheme, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";

function Documentation({ files }) {
  const router = useRouter();
  const theme = useTheme();


  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                color: "transparent",
                mb: 2,
              }}
            >
              Documentation
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 700,
                mx: "auto",
              }}
            >
              Browse technical documentation, guides, and references for the AMP Lab.
            </Typography>
          </Box>

          {/* Document Cards */}
          <Grid container spacing={3}>
            {files.map((file) => (
              <Grid item xs={12} sm={6} md={4} key={file}>
                <Card
                  onClick={() => {
                    if (file.endsWith(".md")) {
                      router.push(`/docs/${file.replace(".md", "")}`);
                    } else if (file.endsWith(".pdf")) {
                      window.open(`/general_documentation/${file}`, "_blank");
                    }
                  }}
                  sx={{
                    cursor: "pointer",
                    borderRadius: 3,
                    height: "100%",
                    transition: "0.25s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.1
                        ),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      <ArticleIcon
                        sx={{
                          fontSize: 40,
                          color: theme.palette.primary.main,
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        wordBreak: "break-word",
                      }}
                    >
                      {file.replace(".md", "")}
                    </Typography>

                    <Button
                      variant="contained"
                      size="small"
                      sx={{ borderRadius: 2 }}
                    >
                      View Document
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}

export async function getStaticProps() {
  const docsDirectory = path.join(process.cwd(), "docs/general_documentation");

  const allFiles = (await fs.promises.readdir(docsDirectory)).filter(
    (file) => file.endsWith(".md") || file.endsWith(".pdf")
  );

  const order = [
    "Adding New Documentation.md",
    "laser_cutter.md",
    "Safety Datasheet 2026.pdf",
  ];

  const files = [
    ...order.filter((file) => allFiles.includes(file)),
    ...allFiles.filter((file) => !order.includes(file)).sort(),
  ];

  return {
    props: {
      files,
    },
  };
}

export default Layout(Documentation);