import React from "react";
import Layout from "@/comps/layout.jsx";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  useTheme,
  alpha,
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

          {/* CENTERED CONTENT */}
          <Box
            sx={{
              maxWidth: 950,
              mx: "auto",
            }}
          >
            {/* AMP LAB TECHNICAL SUPPORT */}
            <Card
              sx={{
                p: { xs: 2, sm: 3 },
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
                    lineHeight: 1.7,
                  }}
                >
                  For general technical questions or help troubleshooting your
                  AMP Lab project, Matthew is the primary technical contact.
                </Typography>

                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: `1px solid ${alpha(
                      theme.palette.primary.main,
                      0.3
                    )}`,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      mb: 1.5,
                    }}
                  >
                    Matthew Scala
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.primary,
                      mb: 2,
                      lineHeight: 1.6,
                    }}
                  >
                    General Electronics, Circuit Design, Troubleshooting
                  </Typography>

                  <Button
                    component="a"
                    href="mailto:matthewscala3820@vt.edu"
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    matthewscala3820@vt.edu
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* FACULTY TECHNICAL CONTACTS */}
            <Card
              sx={{
                p: { xs: 2, sm: 3 },
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
                  knowledge? These Virginia Tech ECE faculty members represent
                  different technical areas that may be relevant to your
                  project. When reaching out, please be respectful of their
                  time and briefly explain your project and what you need help
                  with.
                </Typography>

                <Grid container spacing={2}>
                  {facultyContacts.map((faculty) => (
                    <Grid item xs={12} sm={6} key={faculty.area}>
                      <Card
                        variant="outlined"
                        sx={{
                          height: "100%",
                          borderRadius: 2,
                          transition: "transform 0.2s, box-shadow 0.2s",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: 3,
                          },
                        }}
                      >
                        <CardContent
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            variant="overline"
                            sx={{
                              color: theme.palette.text.secondary,
                              fontWeight: 700,
                              lineHeight: 1.5,
                              mb: 1,
                            }}
                          >
                            {faculty.area}
                          </Typography>

                          <Typography
                            variant="h6"
                            sx={{
                              color: theme.palette.primary.main,
                              fontWeight: 600,
                              mb: 1,
                            }}
                          >
                            {faculty.name}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.text.primary,
                              lineHeight: 1.6,
                              mb: 2,
                            }}
                          >
                            {faculty.focus}
                          </Typography>

                          <Box sx={{ mt: "auto" }}>
                            <Button
                              component="a"
                              href={`mailto:${faculty.email}`}
                              variant="outlined"
                              size="small"
                              fullWidth
                              sx={{
                                textTransform: "none",
                              }}
                            >
                              {faculty.email}
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Layout(Resources);
