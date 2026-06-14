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
  Launch as LaunchIcon,
  CheckCircle as CheckCircleIcon,
  Group as GroupIcon
} from "@mui/icons-material";
import { motion } from "framer-motion";
import Layout from "@/comps/layout.jsx";

// ---------------------------------------------------------------------------
// Build-time helper — resolve a cover image for a project
// ---------------------------------------------------------------------------

async function resolveProjectImage(repoUrl, branch) {
  const cleaned = repoUrl.replace(/\.git$/, "").replace(/#.*$/, "").trim();
  const match = cleaned.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;

  const [, owner, repo] = match;
  const rawBase = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`;

  const headers = {
    "User-Agent": "AMP-Lab-Website",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  // 1. Try hero.png and hero.jpg first (fast HEAD requests)
  for (const filename of ["hero.png", "hero.jpg", "hero.jpeg"]) {
    try {
      const res = await fetch(`${rawBase}/${filename}`, {
        method: "HEAD",
        headers,
      });
      if (res.ok) {
        console.log(`[images] ${owner}/${repo} → ${filename}`);
        return `${rawBase}/${filename}`;
      }
    } catch {
      // continue to next
    }
  }

  // 2. No hero image found — scan the repo root for any .png/.jpg/.jpeg
  try {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents?ref=${branch}`;
    const apiHeaders = {
      Accept: "application/vnd.github.v3+json",
      ...headers,
    };
    const res = await fetch(apiUrl, { headers: apiHeaders });

    if (res.ok) {
      const contents = await res.json();

      if (Array.isArray(contents)) {
        // Look for image files, prefer ones with keywords like
        // "cover", "banner", "thumbnail", "logo" in the name
        const imageFiles = contents.filter(
          (f) =>
            f.type === "file" &&
            /\.(png|jpg|jpeg)$/i.test(f.name)
        );

        if (imageFiles.length > 0) {
          // Prefer images with descriptive names over random ones
          const preferred = imageFiles.find((f) =>
            /cover|banner|thumb|logo|photo|image|pic/i.test(f.name)
          );
          const chosen = preferred || imageFiles[0];
          const imageUrl = `${rawBase}/${chosen.name}`;
          console.log(
            `[images] ${owner}/${repo} → fallback: ${chosen.name}`
          );
          return imageUrl;
        }
      }
    }
  } catch (err) {
    console.warn(`[images] Failed to scan repo ${owner}/${repo}:`, err.message);
  }

  // 3. Nothing found at all
  console.log(`[images] ${owner}/${repo} → no image found`);
  return null;
}

// ---------------------------------------------------------------------------
// Project Card
// ---------------------------------------------------------------------------

function ModernProjectCard({ project, projectKey, isActive }) {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const statusLabel = isActive ? "Active" : "Completed";
  const participants = project.participants || [];

  // Use the image resolved at build time, or the placeholder
  const imgSrc =
    !imageError && project.image ? project.image : "/placeholder-project.png";

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
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"
              : "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          border: `1px solid ${alpha(
            isActive
              ? theme.palette.success.main
              : theme.palette.grey[500],
            0.2
          )}`,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: `0 8px 24px ${alpha(
              theme.palette.primary.main,
              0.15
            )}`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => window.open(project.url, "_blank")}
      >
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="200"
            image={imgSrc}
            alt={projectKey}
            onError={() => setImageError(true)}
            sx={{
              transition: "transform 0.3s ease-in-out",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
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
              icon={isActive ? undefined : <CheckCircleIcon />}
              label={statusLabel}
              color={isActive ? "success" : "default"}
              sx={{
                fontWeight: 500,
                backgroundColor: isActive
                  ? alpha(theme.palette.success.main, 0.9)
                  : alpha(theme.palette.grey[700], 0.85),
                color: "white",
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
                  color: "white",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.url, "_blank");
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
              mb: 1,
            }}
          >
            {projectKey}
          </Typography>

          {/* Mission statement */}
          {project.mission && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, lineHeight: 1.5 }}
            >
              {project.mission}
            </Typography>
          )}

          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            {/* Participants */}
            {participants.length > 0 && (
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <GroupIcon
                  fontSize="small"
                  color="action"
                  sx={{ mt: 0.25 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {participants.join(", ")}
                </Typography>
              </Box>
            )}

            {/* Mentor */}
            {project.mentor && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  Mentor: {project.mentor}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Projects Page
// ---------------------------------------------------------------------------

function Projects({
  activeProjects = {},
  completedProjects = {},
  activeCount = 0,
  completedCount = 0,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const theme = useTheme();

  const allProjects = { ...activeProjects, ...completedProjects };

  const filteredProjects = Object.entries(allProjects).filter(
    ([key, project]) => {
      const participantNames = (project.participants || [])
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        searchTerm === "" ||
        key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.mentor &&
          project.mentor.toLowerCase().includes(searchTerm.toLowerCase())) ||
        participantNames.includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterType === "all" ||
        (filterType === "active" && activeProjects[key]) ||
        (filterType === "completed" && completedProjects[key]);

      return matchesSearch && matchesFilter;
    }
  );

  const sortedProjects = filteredProjects.sort(
    ([keyA, projectA], [keyB, projectB]) => {
      switch (sortBy) {
        case "name":
          return keyA.localeCompare(keyB);
        case "mentor":
          return (projectA.mentor || "").localeCompare(
            projectB.mentor || ""
          );
        default:
          return 0;
      }
    }
  );

  if (activeCount === 0 && completedCount === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress size={40} sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Loading projects...
        </Typography>
        <Alert
          severity="info"
          sx={{ mt: 3, maxWidth: 600, mx: "auto" }}
        >
          If this page doesn't load, there might be an issue with the
          project configuration. Please try refreshing the page or
          contact the lab administrators.
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

            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ mb: 4 }}
            >
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
                  icon={<CheckCircleIcon />}
                  label={`${completedCount} Completed Projects`}
                  color="default"
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item>
                <Chip
                  label={`${activeCount + completedCount} Total Projects`}
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
                placeholder="Search projects, mentors, or participants..."
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
                  <MenuItem value="completed">Completed</MenuItem>
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
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
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
              <Typography
                variant="h6"
                color="text.secondary"
                gutterBottom
              >
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

// ---------------------------------------------------------------------------
// Data fetching at build time
// ---------------------------------------------------------------------------

export async function getStaticProps() {
  try {
    const file = "repos.yaml";
    const fileContents = await fs.readFile(process.cwd() + "/" + file, "utf8");
    const projects = YAML.parse(fileContents);

    // Resolve cover images for all projects in parallel
    const keys = Object.keys(projects);
    const imageResults = await Promise.allSettled(
      keys.map((key) =>
        resolveProjectImage(projects[key].url, projects[key].branch)
      )
    );

    let activeProjects = {};
    let completedProjects = {};
    let activeCount = 0;
    let completedCount = 0;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const project = projects[key];

      // Attach the resolved image URL (or null)
      const imgResult = imageResults[i];
      project.image =
        imgResult.status === "fulfilled" ? imgResult.value : null;

      // Read status directly from repos.yaml
      const isActive =
        (project.status || "completed").toLowerCase() === "active";

      if (isActive) {
        activeProjects[key] = project;
        activeCount++;
      } else {
        completedProjects[key] = project;
        completedCount++;
      }
    }

    return {
      props: {
        activeProjects,
        completedProjects,
        activeCount,
        completedCount,
      },
    };
  } catch (error) {
    console.error("Error loading projects:", error);
    return {
      props: {
        activeProjects: {},
        completedProjects: {},
        activeCount: 0,
        completedCount: 0,
      },
    };
  }
}

export default Layout(Projects);