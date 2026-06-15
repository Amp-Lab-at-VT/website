import React from "react";
import Link from "next/link";
import { promises as fs } from "fs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Layout from "@/comps/layout.jsx";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  useTheme,
  alpha,
} from "@mui/material";

import { motion } from "framer-motion";

function Clean({ fileContents }) {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* HERO SECTION */}
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
              Lab Cleaning Standards
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 700,
                mx: "auto",
              }}
            >
              Expectations and guidelines for maintaining a clean, safe, and organized lab environment.
            </Typography>
          </Box>

          {/* MAIN CONTENT */}
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              background: alpha(theme.palette.background.paper, 0.9),

            }}
          >
            <CardContent>
              <Box
                sx={{
                  "& h1": {
                    fontSize: "1.8rem",
                    mb: 2,
                    color: theme.palette.primary.main,
                  },
                  "& h2": {
                    fontSize: "1.4rem",
                    mt: 3,
                    mb: 1,
                    color: theme.palette.secondary.main,
                  },
                  "& p": {
                    fontSize: "1.05rem",
                    lineHeight: 1.7,
                    mb: 2,
                    color: theme.palette.text.primary,
                  },
                  "& ul": {
                    paddingLeft: "1.5rem",
                  },
                  "& a": {
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                    fontWeight: 500,
                  },
                  "& a:hover": {
                    textDecoration: "underline",
                  },
                  "& code": {
                    background: alpha(theme.palette.secondary.main, 0.08),
                    padding: "2px 6px",
                    borderRadius: "6px",
                  },
                  "& blockquote": {
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                    paddingLeft: "12px",
                    margin: "12px 0",
                    fontStyle: "italic",
                    color: theme.palette.text.primary,
                    opacity: 0.9,
                  },

                }}
              >
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {fileContents}
                </ReactMarkdown>
              </Box>
            </CardContent>
          </Card>

          {/* CONTACT SECTION */}
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Questions about lab cleaning standards?
            </Typography>

            <Button
              variant="contained"
              component={Link}
              href="/Leadership"
            >
              Contact Leadership Team
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export async function getStaticProps() {
  const file = "cleaning_standards.md";

  const fileContents = await fs.readFile(
    process.cwd() + "/docs/" + file,
    "utf8"
  );

  return { props: { fileContents } };
}

export default Layout(Clean);
