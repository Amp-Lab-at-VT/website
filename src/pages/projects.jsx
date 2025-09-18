import React, { useState } from "react";
import { promises as fs } from "fs";
import YAML from "yaml";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Button,
  CircularProgress,
  Alert,
  useTheme,
  alpha,
  Fade,
  IconButton
} from "@mui/material";
import {
  Search as SearchIcon,
  GitHub as GitHubIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Code as CodeIcon,
  Launch as LaunchIcon
} from "@mui/icons-material";
import { motion } from "framer-motion";
import Layout from "@/comps/layout.jsx";

function ModernProjectCard({ project, projectKey, isActive }) {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getDifference = (str1, str2) => {
    let diff = "";
    str2.split("").forEach(function (val, i) {
      if (val !== str1.charAt(i)) diff += val;
    });
    return diff;
  };

  const diff = getDifference("https://github.com/", project.url);
  const imgPath = `https://raw.githubusercontent.com/${diff}/${project.branch}/hero.png`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          background: theme.palette.mode === 'light' 
            ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          border: `1px solid ${alpha(isActive ? theme.palette.success.main : theme.palette.error.main, 0.2)}`,
          transition: 'all 0.3s ease-in-out',
          "&:hover": {
            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => window.open(project.url, '_blank')}
      >
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="200"
            image={imageError ? "/placeholder-project.png" : imgPath}
            alt={projectKey}
            onError={() => setImageError(true)}
            sx={{
              transition: 'transform 0.3s ease-in-out',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              display: "flex",
              gap: 1,
            }}
          >
            <Chip
              size="small"
              label={isActive ? "Active" : "Inactive"}
              color={isActive ? "success" : "error"}
              sx={{ 
                fontWeight: 500,
                backgroundColor: alpha(isActive ? theme.palette.success.main : theme.palette.error.main, 0.9),
                color: 'white'
              }}
            />
          </Box>
          <Fade in={isHovered}>
            <Box
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                display: "flex",
                gap: 1,
              }}
            >
              <IconButton
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.9),
                  color: 'white',
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.url, '_blank');
                }}
              >
                <LaunchIcon fontSize="small" />
              </IconButton>
            </Box>
          </Fade>
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            {projectKey}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
            {project.mentor_last_name && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  Mentor: {project.mentor_last_name}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CodeIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Branch: {project.branch}
              </Typography>
            </Box>
            {project.date && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ScheduleIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  Last update: {new Date(project.date).toLocaleDateString()}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Projects({
  activeProjects = {},
  inactiveProjects = {},
  activeCount = 0,
  inactiveCount = 0,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const theme = useTheme();

  const allProjects = { ...activeProjects, ...inactiveProjects };
  
  const filteredProjects = Object.entries(allProjects).filter(([key, project]) => {
    const matchesSearch = searchTerm === "" || 
      key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.mentor_last_name && project.mentor_last_name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterType === "all" ||
      (filterType === "active" && activeProjects[key]) ||
      (filterType === "inactive" && inactiveProjects[key]);
    
    return matchesSearch && matchesFilter;
  });

  const sortedProjects = filteredProjects.sort(([keyA, projectA], [keyB, projectB]) => {
    switch (sortBy) {
      case "name":
        return keyA.localeCompare(keyB);
      case "date":
        return new Date(projectB.date || 0) - new Date(projectA.date || 0);
      case "mentor":
        return (projectA.mentor_last_name || "").localeCompare(projectB.mentor_last_name || "");
      default:
        return 0;
    }
  });

  if (activeCount === 0 && inactiveCount === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress size={40} sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Loading projects...
        </Typography>
        <Alert severity="info" sx={{ mt: 3, maxWidth: 600, mx: "auto" }}>
          If this page doesn't load, there might be an issue with the GitHub API connection.
          Please try refreshing the page or contact the lab administrators.
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h1"
              sx={{
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Student Projects
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 400,
                mb: 4,
              }}
            >
              Discover innovative projects created by AMP Lab students
            </Typography>

            <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
              <Grid item>
                <Chip
                  icon={<CodeIcon />}
                  label={`${activeCount} Active Projects`}
                  color="success"
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<ScheduleIcon />}
                  label={`${inactiveCount} Inactive Projects`}
                  color="error"
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item>
                <Chip
                  label={`${activeCount + inactiveCount} Total Projects`}
                  color="primary"
                  variant="outlined"
                  size="medium"
                />
              </Grid>
            </Grid>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search projects or mentors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Filter</InputLabel>
                <Select
                  value={filterType}
                  label="Filter"
                  onChange={(e) => setFilterType(e.target.value)}
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="all">All Projects</MenuItem>
                  <MenuItem value="active">Active Only</MenuItem>
                  <MenuItem value="inactive">Inactive Only</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="name">Project Name</MenuItem>
                  <MenuItem value="date">Last Updated</MenuItem>
                  <MenuItem value="mentor">Mentor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {sortedProjects.length > 0 ? (
            <Grid container spacing={4}>
              {sortedProjects.map(([projectKey, project], index) => (
                <Grid item xs={12} sm={6} lg={4} key={projectKey}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ModernProjectCard
                      project={project}
                      projectKey={projectKey}
                      isActive={!!activeProjects[projectKey]}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No projects found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Try adjusting your search term or filter options.
              </Typography>
            </Box>
          )}
        </motion.div>

        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography variant="h6" gutterBottom>
            Want to start your own project?
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/getting_started"
            component="a"
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
            Get Started Today
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export async function getStaticProps() {
  try {
    const file = "repos.yaml";
    const fileContents = await fs.readFile(process.cwd() + "/" + file, "utf8");
    const projects = YAML.parse(fileContents);

    let activeProjects = {};
    let inactiveProjects = {};
    let activeCount = 0;
    let inactiveCount = 0;

    for (const key in projects) {
      const project = projects[key];
      
      // Simulate a date (in real implementation, fetch from GitHub API)
      const simulatedDate = new Date();
      simulatedDate.setDate(simulatedDate.getDate() - Math.floor(Math.random() * 200));
      project.date = simulatedDate.toISOString();

      // Check if project is active (less than 90 days old)
      const diffTime = Math.abs(new Date() - new Date(project.date));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 90) {
        inactiveProjects[key] = project;
        inactiveCount++;
      } else {
        activeProjects[key] = project;
        activeCount++;
      }
    }

    return {
      props: { activeProjects, inactiveProjects, activeCount, inactiveCount },
    };
  } catch (error) {
    console.error("Error loading projects:", error);
    return {
      props: { 
        activeProjects: {}, 
        inactiveProjects: {}, 
        activeCount: 0, 
        inactiveCount: 0 
      },
    };
  }
}

export default Layout(Projects);