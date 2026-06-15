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
  Chip,
  Grid,
  useTheme,
  alpha,
} from "@mui/material";

import { motion } from "framer-motion";

function UsefulLinks({ fileContents }) {
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
              Useful Links
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 700,
                mx: "auto",
              }}
            >
              All AMP Lab resources, documentation, and guides in one place
            </Typography>
          </Box>

          {/* MAIN CONTENT */}
          <Grid container spacing={4}>

            {/* Markdown Content */}
            <Grid item xs={12} md={8}>
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
                        background: alpha(theme.palette.primary.main, 0.08),
                        padding: "2px 6px",
                        borderRadius: "6px",
                      },
                    }}
                  >
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                      {fileContents}
                    </ReactMarkdown>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* SIDE PANEL */}
            <Grid item xs={12} md={4}>

              <Card sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Quick Access
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {[
                    "Swipe Access",
                    "Lab Rules",
                    "Training",
                    "Safety",
                    "EHS",
                    "Equipment",
                  ].map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              </Card>

              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Need Help?
                </Typography>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  If you're unsure about lab access or documentation, start with the swipe access guide.
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  component={Link}
                  href="/getting_started"
                >
                  Getting Started
                </Button>
              </Card>

            </Grid>
          </Grid>

        </motion.div>

      </Container>
    </Box>
  );
}

export async function getStaticProps() {
  const file = "resources.md";

  const fileContents = await fs.readFile(
    process.cwd() + "/docs/" + file,
    "utf8"
  );

  return { props: { fileContents } };
}

export default Layout(UsefulLinks);
