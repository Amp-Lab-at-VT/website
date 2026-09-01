import React from "react";
import Link from "next/link";
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
  Stack,
} from "@mui/material";

import { motion } from "framer-motion";

const facultyContacts = [
  {
    area: "Communications",
    name: "Mary Lanzerotti",
    email: "marylanzerotti@vt.edu",
    focus: "Digital Signal Processing, Filter Design, Signals & Systems",
  },
  {
    area: "Computer Systems",
    name: "Leyla Nazhandali",
    email: "leyla@vt.edu",
    focus: "Computer Architecture, Embedded Systems, Hardware Security",
  },
  {
    area: "Electromagnetics",
    name: "Majid Manteghi",
    email: "manteghi@vt.edu",
    focus: "Antennas, RF/Microwave Systems, Electromagnetics",
  },
  {
    area: "Electronic Components, Circuits, and Systems",
    name: "Arthur Ball",
    email: "aball@vt.edu",
    focus: "Analog & Digital Electronics, Power Electronics, Circuit Design",
  },
  {
    area: "Networking",
    name: "Scott Midkiff",
    email: "midkiff@vt.edu",
    focus: "Computer Networks, Telecommunications, Cybersecurity",
  },
  {
    area: "Photonics",
    name: "Luke Lester",
    email: "lflester@vt.edu",
    focus: "Photonics, Optoelectronics, Semiconductor Lasers",
  },
  {
    area: "Power",
    name: "Scott Dunning",
    email: "scottd65@vt.edu",
    focus: "Power Systems, Energy Systems, Energy Efficiency",
  },
  {
    area: "Signals, Systems, and Controls",
    name: "Daniel Stilwell",
    email: "stilwell@vt.edu",
    focus: "Controls, Robotics, Autonomous Systems",
  },
  {
    area: "Software and Machine Intelligence",
    name: "Christopher Wyatt",
    email: "clwyatt@vt.edu",
    focus: "Machine Learning, Artificial Intelligence, Systems Theory",
  },
  {
    area: "VLSI and Design Automation",
    name: "Jason Thweatt",
    email: "jthweatt@vt.edu",
    focus: "Digital Design, Microprocessors, Digital Hardware",
  },
];

function Resources() {
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
              Technical Resources
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 750,
                mx: "auto",
              }}
            >
              Technical contacts and faculty resources to help guide your AMP
              Lab project
            </Typography>
          </Box>

          {/* MAIN CONTENT */}
          <Grid container spacing={4}>
            {/* MAIN RESOURCE LIST */}
            <Grid item xs={12} md={8}>
              {/* AMP LAB TECHNICAL SUPPORT */}
              <Card
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: 3,
                  background: alpha(theme.palette.background.paper, 0.9),
                }}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    sx={{
                      color: theme.palette.primary.main,
                      mb: 1,
                    }}
                  >
                    AMP Lab Technical Support
                  </Typography>

                  <Typography
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 3,
                    }}
                  >
                    For general technical questions about your AMP project,
                    start with the AMP Lab Tech Lead.
                  </Typography>

                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.25
                      )}`,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                      }}
                    >
                      Matthew Scala
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        mt: 0.5,
                      }}
                    >
                      AMP Lab Tech Lead
                    </Typography>

                    <Typography
                      sx={{
                        color: theme.palette.text.secondary,
                        mt: 1.5,
                        mb: 2,
                      }}
                    >
                      General Electronics, Circuit Design, Troubleshooting
                    </Typography>

                    <Button
                      component="a"
                      href="mailto:matthewscala3820@vt.edu"
                      variant="outlined"
                      size="small"
                    >
                      matthewscala3820@vt.edu
                    </Button>
                  </Box>
                </CardContent>
              </Card>

              {/* FACULTY CONTACTS */}
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: alpha(theme.palette.background.paper, 0.9),
                }}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    sx={{
                      color: theme.palette.primary.main,
                      mb: 1,
                    }}
                  >
                    Faculty Technical Contacts
                  </Typography>

                  <Typography
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 4,
                      lineHeight: 1.7,
                    }}
                  >
                    Working on something that requires more specialized
                    knowledge? These Virginia Tech ECE faculty members
                    represent different technical areas that may be relevant to
                    your project.
                  </Typography>

                  <Grid container spacing={2}>
                    {facultyContacts.map((faculty) => (
                      <Grid item xs={12} sm={6} key={faculty.area}>
                        <Card
                          variant="outlined"
                          sx={{
                            height: "100%",
                            borderRadius: 2,
                            transition: "0.2s",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: 3,
                            },
                          }}
                        >
                          <CardContent>
                            <Typography
                              variant="overline"
                              sx={{
                                color: theme.palette.primary.main,
                                fontWeight: 700,
                              }}
                            >
                              {faculty.area}
                            </Typography>

                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                mt: 0.5,
                              }}
                            >
                              {faculty.name}
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{
                                color: theme.palette.text.secondary,
                                mt: 1,
                                mb: 2,
                                lineHeight: 1.6,
                              }}
                            >
                              {faculty.focus}
                            </Typography>

                            <Button
                              component="a"
                              href={`mailto:${faculty.email}`}
                              variant="outlined"
                              size="small"
                              fullWidth
                            >
                              {faculty.email}
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* SIDE PANEL */}
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Card sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Quick Access
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
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

                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      lineHeight: 1.6,
                    }}
                  >
                    For general project questions, start with the AMP Lab Tech
                    Lead. For specialized technical questions, reach out to the
                    faculty contact whose area best matches your project.
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
              </Stack>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Layout(Resources);
