import React from "react";
import Link from "next/link";
import { promises as fs } from "fs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Layout from "@/comps/layout.jsx";
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Chip,
  useTheme,
  alpha
} from "@mui/material";
import { motion } from "framer-motion";

function About({ fileContents }) {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero Section */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              About the AMP Lab
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 400,
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Empowering students through hands-on innovation and collaborative learning
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 8 }}>
            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  textAlign: "center", 
                  p: 3,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <Typography variant="h3" color="primary" fontWeight="bold">50+</Typography>
                <Typography variant="h6" color="text.secondary">Active Projects</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  textAlign: "center", 
                  p: 3,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                }}
              >
                <Typography variant="h3" color="secondary" fontWeight="bold">200+</Typography>
                <Typography variant="h6" color="text.secondary">Students Served</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  textAlign: "center", 
                  p: 3,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.05)} 0%, ${alpha(theme.palette.success.main, 0.03)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                }}
              >
                <Typography variant="h3" sx={{ color: theme.palette.info.main }} fontWeight="bold">15+</Typography>
                <Typography variant="h6" color="text.secondary">Years of Innovation</Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Main Content */}
          <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 4, mb: 4 }}>
                <Box sx={{ 
                  '& h2': { 
                    color: theme.palette.primary.main,
                    fontSize: '2rem',
                    fontWeight: 600,
                    mb: 3,
                    mt: 4,
                    '&:first-of-type': { mt: 0 }
                  },
                  '& p': {
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    mb: 3,
                    color: theme.palette.text.primary
                  }
                }}>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{fileContents}</ReactMarkdown>
                </Box>
              </Card>

              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/Leadership"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    borderRadius: 3,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    "&:hover": {
                      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    },
                  }}
                >
                  Meet Our Leadership Team
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              {/* Key Features */}
              <Card sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  What We Offer
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {[
                    "Mentorship", 
                    "3D Printing", 
                    "PCB Design", 
                    "Soldering Training",
                    "Project Funding",
                    "Tool Access",
                    "Collaboration",
                    "Skill Building"
                  ].map((feature) => (
                    <Chip 
                      key={feature}
                      label={feature} 
                      variant="outlined" 
                      color="primary"
                      size="small"
                    />
                  ))}
                </Box>
              </Card>

              {/* Contact Info */}
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Visit Us
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Location:</strong> Room 236
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  1185 Perry St
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Blacksburg, VA 24060
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  component={Link}
                  href="/getting_started"
                  fullWidth
                >
                  Get Started Today
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
  const file = "about.md";
  const fileContents = await fs.readFile(
    process.cwd() + "/docs/" + file,
    "utf8",
  );
  return { props: { fileContents } };
}

export default Layout(About);
