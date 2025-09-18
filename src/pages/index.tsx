import { useState } from "react";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent,
  Fade,
  useTheme,
  alpha
} from "@mui/material";
import { motion } from "framer-motion";
import Layout from "@/comps/layout.jsx";

function Home() {
  const [showButton, setShowButton] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23204d71' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            opacity: 0.5,
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    mb: 3,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                  }}
                >
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .changeDelay(50)
                        .pauseFor(250)
                        .typeString("The AMP Lab")
                        .pauseFor(300)
                        .typeString("<br/>@ Virginia Tech")
                        .pauseFor(500)
                        .callFunction(() => {
                          setShowButton(true);
                          setTimeout(() => setShowCards(true), 300);
                        })
                        .start();
                    }}
                  />
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    color: theme.palette.text.secondary,
                    fontWeight: 400,
                    lineHeight: 1.6,
                  }}
                >
                  Autonomous Mastery Prototyping Laboratory - Where innovation meets hands-on learning
                </Typography>
              </motion.div>

              <Fade in={showButton} timeout={800}>
                <Box sx={{ mb: 4 }}>
                  <Button
                    component={Link}
                    href="/getting_started"
                    variant="contained"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      mr: 2,
                      fontSize: "1.1rem",
                      borderRadius: 3,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      "&:hover": {
                        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      },
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    component={Link}
                    href="/projects"
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      borderRadius: 3,
                      borderWidth: 2,
                      "&:hover": {
                        borderWidth: 2,
                      },
                    }}
                  >
                    View Projects
                  </Button>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Feature Cards Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Fade in={showCards} timeout={1000}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={showCards ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom color="primary">
                      🔧
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Hands-On Learning
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Build real projects with mentorship from experienced students and faculty
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={showCards ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom color="secondary">
                      🚀
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Innovation Hub
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Create anything you can imagine with access to modern tools and resources
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={showCards ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.05)} 0%, ${alpha(theme.palette.success.main, 0.03)} 100%)`,
                    border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ color: theme.palette.info.main }}>
                      🎓
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Career Ready
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Gain skills that lead to internships and full-time positions
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Fade>
      </Container>
    </Box>
  );
}

export default Layout(Home);
