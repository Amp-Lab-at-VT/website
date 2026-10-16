import { promises as fs } from "fs";
import YAML from "yaml";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import { resolveProjectImage } from "@/lib/projectImage";

// How long each project stays in focus. Override with ?seconds=N in the URL.
const DEFAULT_SECONDS = 60;

// Same palette and type as the main site's light theme
const RED = "#b91c1c";
const RED_DARK = "#7f1d1d";
const TEXT = "#111827";
const TEXT_MUTED = "#6b7280";
const DIVIDER = "#e5e7eb";
const FONT = ["Inter", "system-ui", "-apple-system", "sans-serif"].join(",");

const ease = [0.22, 1, 0.36, 1];

const initialsOf = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

const repoPathOf = (url) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\.git$/, "");

// ---------------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------------

const ProjectImage = ({ project }) => {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef(null);

  // onError can fire before hydration, so also check an already-broken image
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (!project.image || failed) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: RED,
        }}
      >
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: "18vh",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.04em",
          }}
        >
          {initialsOf(project.name)}
        </Typography>
      </Box>
    );
  }

  return (
    <motion.img
      src={project.image}
      alt={project.name}
      ref={imgRef}
      onError={() => setFailed(true)}
      // Slow drift so the screen never feels frozen
      initial={{ scale: 1.0 }}
      animate={{ scale: 1.06 }}
      transition={{ duration: 70, ease: "linear" }}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        display: "block",
      }}
    />
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const labelSx = {
  fontFamily: FONT,
  fontSize: "1.7vh",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: TEXT_MUTED,
  mb: "1.2vh",
};

const Spotlight = ({ project }) => (
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      display: "grid",
      gridTemplateColumns: "1.15fr 1fr",
      gap: "6vh",
      alignItems: "center",
      px: "7vh",
    }}
  >
    {/* Image */}
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60, transition: { duration: 0.5 } }}
      transition={{ duration: 0.9, ease }}
      style={{ height: "100%" }}
    >
      <Box
        sx={{
          height: "100%",
          overflow: "hidden",
          backgroundColor: "#f3f4f6",
          border: `1px solid ${DIVIDER}`,
        }}
      >
        <ProjectImage project={project} />
      </Box>
    </motion.div>

    {/* Details */}
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
        exit: { opacity: 0, transition: { duration: 0.4 } },
      }}
    >
      <motion.div variants={fadeUp}>
        <Typography
          sx={{
            ...labelSx,
            color: project.active ? RED : TEXT_MUTED,
            mb: "2vh",
          }}
        >
          {project.active ? "Active project" : "Completed project"}
        </Typography>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: "7.5vh",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: TEXT,
            mb: "2.5vh",
          }}
        >
          {project.name}
        </Typography>
        <Box
          sx={{
            width: "10vh",
            height: "0.6vh",
            backgroundColor: RED,
            mb: "3.5vh",
          }}
        />
      </motion.div>

      {project.mission && (
        <motion.div variants={fadeUp}>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: "3vh",
              lineHeight: 1.6,
              color: "#374151",
              mb: "5vh",
              maxWidth: "80vh",
            }}
          >
            {project.mission}
          </Typography>
        </motion.div>
      )}

      {project.participants?.length > 0 && (
        <motion.div variants={fadeUp}>
          <Typography sx={labelSx}>Built by</Typography>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: "2.8vh",
              fontWeight: 600,
              color: TEXT,
              mb: "4vh",
            }}
          >
            {project.participants.join(", ")}
          </Typography>
        </motion.div>
      )}

      {project.url && (
        <motion.div variants={fadeUp}>
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: "2.1vh",
              color: TEXT_MUTED,
            }}
          >
            {repoPathOf(project.url)}
          </Typography>
        </motion.div>
      )}
    </motion.div>
  </Box>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const Page = ({ projects }) => {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const seconds = useMemo(() => {
    const fromQuery = Number(router.query.seconds);
    return fromQuery > 0 ? fromQuery : DEFAULT_SECONDS;
  }, [router.query.seconds]);

  const count = projects.length;
  const project = projects[index % Math.max(count, 1)];
  const next = projects[(index + 1) % Math.max(count, 1)];

  // Advance to the next project on a fixed cadence
  useEffect(() => {
    if (count < 2) return;
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % count),
      seconds * 1000,
    );
    return () => clearTimeout(timer);
  }, [index, count, seconds]);

  // Warm the cache for the next image so the transition is seamless
  useEffect(() => {
    if (next?.image) {
      const img = new window.Image();
      img.src = next.image;
    }
  }, [next]);

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        overflow: "hidden",
        backgroundColor: "#ffffff",
        fontFamily: FONT,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header, like the site's nav bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "2vh",
          px: "7vh",
          py: "2.5vh",
          borderBottom: `1px solid ${DIVIDER}`,
        }}
      >
        <Box
          component="img"
          src="/favicon.ico"
          alt="AMP Lab logo"
          sx={{ height: "7vh", width: "7vh" }}
        />
        <Box>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: "3.6vh",
              fontWeight: 700,
              color: TEXT,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            The AMP Lab{" "}
            <Box component="span" sx={{ color: RED }}>
              @ Virginia Tech
            </Box>
          </Typography>
          <Typography
            sx={{ fontFamily: FONT, fontSize: "2vh", color: TEXT_MUTED }}
          >
            Autonomous Mastery Prototyping Laboratory
          </Typography>
        </Box>
      </Box>

      {/* Spotlight */}
      <Box sx={{ position: "relative", flex: 1, my: "5vh" }}>
        <AnimatePresence mode="wait">
          {project ? (
            <Spotlight key={index} project={project} />
          ) : (
            <Typography
              sx={{
                fontFamily: FONT,
                color: TEXT,
                fontSize: "5vh",
                textAlign: "center",
                mt: "25vh",
              }}
            >
              Come in and start a project today!
            </Typography>
          )}
        </AnimatePresence>
      </Box>

      {/* Progress */}
      <Box sx={{ height: "0.8vh", backgroundColor: RED_DARK }}>
        {count > 1 && (
          <motion.div
            key={`progress-${index}`}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: seconds, ease: "linear" }}
            style={{
              height: "100%",
              backgroundColor: "#ffffff",
              opacity: 0.85,
            }}
          />
        )}
      </Box>

      {/* Footer, like the site's red footer */}
      <Box
        sx={{
          backgroundColor: RED,
          color: "#fff",
          px: "7vh",
          py: "2.5vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: "3vh",
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Come in and start a project today!
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "2.5vh" }}>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: "3.4vh",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            amp-lab.org
          </Typography>
          <Box
            component="img"
            src="/amp-lab-qr.svg"
            alt="QR code for amp-lab.org"
            sx={{
              height: "9vh",
              width: "9vh",
              backgroundColor: "#fff",
              p: "0.8vh",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

// Load every project (active first) with its cover image from repos.yaml at build time
export async function getStaticProps() {
  const fileContents = await fs.readFile(process.cwd() + "/repos.yaml", "utf8");
  const all = YAML.parse(fileContents) || {};

  const list = Object.entries(all).map(([name, p]) => ({
    name,
    url: p.url || null,
    branch: p.branch || "main",
    mission: p.mission || null,
    participants: p.participants || [],
    active: (p.status || "completed").toLowerCase() === "active",
  }));
  list.sort((a, b) => Number(b.active) - Number(a.active));

  const images = await Promise.allSettled(
    list.map((p) => (p.url ? resolveProjectImage(p.url, p.branch) : null)),
  );

  const projects = list.map(({ branch, ...p }, i) => ({
    ...p,
    image: images[i].status === "fulfilled" ? images[i].value : null,
  }));

  return { props: { projects } };
}

export default Page;
