import { promises as fs } from "fs";
import YAML from "yaml";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import { resolveProjectImage } from "@/lib/projectImage";

// How long each project stays in focus. Override with ?seconds=N in the URL.
const DEFAULT_SECONDS = 60;

const MAROON = "#861F41";
const ORANGE = "#E5751F";

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

  if (!project.image || failed) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${MAROON}, ${ORANGE})`,
        }}
      >
        <Typography
          sx={{
            fontSize: "18vh",
            fontWeight: 800,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "-0.04em",
          }}
        >
          {initialsOf(project.name)}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Blurred copy fills the letterbox around odd aspect ratios */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: "-5%",
          backgroundImage: `url(${project.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(30px) brightness(0.6)",
        }}
      />
      <motion.img
        src={project.image}
        alt={project.name}
        onError={() => setFailed(true)}
        // Slow Ken Burns drift so the screen never feels frozen
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 70, ease: "linear" }}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </Box>
  );
};

const Person = ({ name }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "1.2vh",
      pr: "2vh",
      pl: "0.6vh",
      py: "0.6vh",
      borderRadius: "999px",
      backgroundColor: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.12)",
    }}
  >
    <Box
      sx={{
        width: "5vh",
        height: "5vh",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${MAROON}, ${ORANGE})`,
        fontWeight: 700,
        fontSize: "1.9vh",
        color: "#fff",
      }}
    >
      {initialsOf(name)}
    </Box>
    <Typography sx={{ fontSize: "2.4vh", color: "#fff", fontWeight: 500 }}>
      {name}
    </Typography>
  </Box>
);

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
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: "68vh" }}
    >
      <Box
        sx={{
          height: "100%",
          borderRadius: "3vh",
          overflow: "hidden",
          backgroundColor: "rgba(0,0,0,0.35)",
          boxShadow: "0 4vh 10vh rgba(0,0,0,0.55)",
          border: "1px solid rgba(255,255,255,0.1)",
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
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "1vh",
            px: "1.8vh",
            py: "0.7vh",
            borderRadius: "999px",
            backgroundColor: "rgba(229,117,31,0.15)",
            border: `1px solid ${ORANGE}`,
            mb: "3vh",
          }}
        >
          <Box
            component={motion.span}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            sx={{
              width: "1.2vh",
              height: "1.2vh",
              borderRadius: "50%",
              backgroundColor: ORANGE,
            }}
          />
          <Typography
            sx={{
              fontSize: "1.8vh",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: ORANGE,
            }}
          >
            ACTIVE PROJECT
          </Typography>
        </Box>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Typography
          sx={{
            fontSize: "8vh",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            mb: "3vh",
          }}
        >
          {project.name}
        </Typography>
      </motion.div>

      {project.mission && (
        <motion.div variants={fadeUp}>
          <Typography
            sx={{
              fontSize: "3.2vh",
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.8)",
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
          <Box
            sx={{ display: "flex", flexWrap: "wrap", gap: "1.5vh", mb: "4vh" }}
          >
            {project.participants.map((name) => (
              <Person key={name} name={name} />
            ))}
          </Box>
        </motion.div>
      )}

      {project.mentor && (
        <motion.div variants={fadeUp}>
          <Typography sx={labelSx}>Mentor</Typography>
          <Typography sx={{ fontSize: "2.6vh", color: "#fff", mb: "4vh" }}>
            {project.mentor}
          </Typography>
        </motion.div>
      )}

      {project.url && (
        <motion.div variants={fadeUp}>
          <Typography
            sx={{
              fontSize: "2.2vh",
              fontFamily: "monospace",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {repoPathOf(project.url)}
          </Typography>
        </motion.div>
      )}
    </motion.div>
  </Box>
);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const labelSx = {
  fontSize: "1.7vh",
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.45)",
  mb: "1.5vh",
};

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
        backgroundColor: "#0e0a0c",
        fontFamily: "inherit",
      }}
    >
      {/* Blurred, tinted backdrop from the current image */}
      <AnimatePresence>
        <motion.div
          key={`bg-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          style={{
            position: "absolute",
            inset: "-10%",
            backgroundImage: project?.image ? `url(${project.image})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(60px) saturate(1.3)",
            opacity: 0.35,
          }}
        />
      </AnimatePresence>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at top left, rgba(134,31,65,0.55), transparent 60%),
                       linear-gradient(180deg, rgba(14,10,12,0.4), rgba(14,10,12,0.85))`,
        }}
      />

      {/* Header */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: "7vh",
          pt: "4vh",
          zIndex: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "3.4vh",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            The Amp Lab{" "}
            <Box component="span" sx={{ color: ORANGE }}>
              at Virginia Tech
            </Box>
          </Typography>
          <Typography sx={{ fontSize: "2vh", color: "rgba(255,255,255,0.6)" }}>
            Come in and start a project today!
          </Typography>
        </Box>
        {count > 0 && (
          <Typography
            sx={{
              fontSize: "2.2vh",
              fontWeight: 600,
              color: "rgba(255,255,255,0.6)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <Box component="span" sx={{ color: "#fff" }}>
              {String(index + 1).padStart(2, "0")}
            </Box>{" "}
            / {String(count).padStart(2, "0")}
          </Typography>
        )}
      </Box>

      {/* Spotlight */}
      <Box
        sx={{
          position: "absolute",
          top: "12vh",
          bottom: "12vh",
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <AnimatePresence mode="wait">
          {project ? (
            <Spotlight key={index} project={project} />
          ) : (
            <Typography
              sx={{
                color: "#fff",
                fontSize: "5vh",
                textAlign: "center",
                mt: "30vh",
              }}
            >
              No active projects right now. Start one today!
            </Typography>
          )}
        </AnimatePresence>
      </Box>

      {/* Footer: up next, site link, progress */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          px: "7vh",
          pb: "4vh",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mb: "2vh",
          }}
        >
          <Typography
            sx={{ fontSize: "2.2vh", color: "rgba(255,255,255,0.55)" }}
          >
            {count > 1 && (
              <>
                Up next ·{" "}
                <Box component="span" sx={{ color: "#fff", fontWeight: 600 }}>
                  {next.name}
                </Box>
              </>
            )}
          </Typography>
          <Typography
            sx={{ fontSize: "2.6vh", fontWeight: 700, color: ORANGE }}
          >
            amp-lab.org
          </Typography>
        </Box>

        <Box
          sx={{
            height: "0.7vh",
            borderRadius: "999px",
            backgroundColor: "rgba(255,255,255,0.12)",
            overflow: "hidden",
          }}
        >
          {count > 1 && (
            <motion.div
              key={`progress-${index}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: seconds, ease: "linear" }}
              style={{
                height: "100%",
                borderRadius: "999px",
                background: `linear-gradient(90deg, ${MAROON}, ${ORANGE})`,
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Load active projects (with their cover images) from repos.yaml at build time
export async function getStaticProps() {
  const fileContents = await fs.readFile(process.cwd() + "/repos.yaml", "utf8");
  const all = YAML.parse(fileContents) || {};

  const active = Object.entries(all)
    .filter(([, p]) => (p.status || "completed").toLowerCase() === "active")
    .map(([name, p]) => ({
      name,
      url: p.url || null,
      mission: p.mission || null,
      participants: p.participants || [],
      mentor: p.mentor || null,
    }));

  const images = await Promise.allSettled(
    active.map((p) => {
      const branch = all[p.name].branch || "main";
      return p.url ? resolveProjectImage(p.url, branch) : null;
    }),
  );

  const projects = active.map((p, i) => ({
    ...p,
    image: images[i].status === "fulfilled" ? images[i].value : null,
  }));

  return { props: { projects } };
}

export default Page;
