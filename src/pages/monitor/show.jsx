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

// Size things by the screen's short side so 16:10 or 4:3 monitors don't overflow
const u = (n) => `min(${n}vh, ${(n * 9) / 16}vw)`;

const initialsOf = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

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
            fontSize: u(18),
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
  fontSize: u(1.7),
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: TEXT_MUTED,
  mb: u(1.2),
};

const Spotlight = ({ project }) => (
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      display: "grid",
      gridTemplateColumns: "1.15fr 1fr",
      gridTemplateRows: "minmax(0, 1fr)",
      gap: u(6),
      alignItems: "center",
      px: u(7),
    }}
  >
    {/* Image */}
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60, transition: { duration: 0.5 } }}
      transition={{ duration: 0.9, ease }}
      style={{ height: "100%", minHeight: 0 }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
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
      style={{ maxHeight: "100%", minHeight: 0, overflow: "hidden" }}
    >
      <motion.div variants={fadeUp}>
        <Typography
          sx={{
            ...labelSx,
            color: project.active ? RED : TEXT_MUTED,
            mb: u(2),
          }}
        >
          {project.active ? "Active project" : "Completed project"}
        </Typography>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: u(7.5),
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: TEXT,
            mb: u(2.5),
          }}
        >
          {project.name}
        </Typography>
        <Box
          sx={{
            width: u(10),
            height: u(0.6),
            backgroundColor: RED,
            mb: u(3.5),
          }}
        />
      </motion.div>

      {project.mission && (
        <motion.div variants={fadeUp}>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: u(3),
              lineHeight: 1.6,
              color: "#374151",
              mb: u(5),
              maxWidth: u(80),
              display: "-webkit-box",
              WebkitLineClamp: 6,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
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
              fontSize: u(2.8),
              fontWeight: 600,
              color: TEXT,
              mb: u(4),
            }}
          >
            {project.participants.join(", ")}
          </Typography>
        </motion.div>
      )}
    </motion.div>
  </Box>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

// Fisher-Yates shuffle; avoid repeating the last project at the start of a new round
const shuffled = (items, avoidFirst) => {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  if (out.length > 1 && out[0] === avoidFirst) {
    [out[0], out[1]] = [out[1], out[0]];
  }
  return out;
};

const Page = ({ projects }) => {
  const router = useRouter();
  // Shuffle on the client only, so the server render and hydration agree
  const [order, setOrder] = useState(null);
  const [index, setIndex] = useState(0);
  const [round, setRound] = useState(0);

  const seconds = useMemo(() => {
    const fromQuery = Number(router.query.seconds);
    return fromQuery > 0 ? fromQuery : DEFAULT_SECONDS;
  }, [router.query.seconds]);

  useEffect(() => {
    setOrder(shuffled(projects));
  }, [projects]);

  const count = order?.length ?? 0;
  const project = order?.[index];
  const next = order?.[index + 1];

  // Advance on a fixed cadence; reshuffle after every full pass
  useEffect(() => {
    if (count < 2) return;
    const timer = setTimeout(() => {
      if (index + 1 < count) {
        setIndex(index + 1);
      } else {
        setOrder(shuffled(projects, order[index]));
        setIndex(0);
        setRound((r) => r + 1);
      }
    }, seconds * 1000);
    return () => clearTimeout(timer);
  }, [index, count, seconds, order, projects]);

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
          gap: u(2),
          px: u(7),
          py: u(2.5),
          borderBottom: `1px solid ${DIVIDER}`,
        }}
      >
        <Box
          component="img"
          src="/favicon.ico"
          alt="AMP Lab logo"
          sx={{ height: u(7), width: u(7) }}
        />
        <Box>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: u(3.6),
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
            sx={{ fontFamily: FONT, fontSize: u(2), color: TEXT_MUTED }}
          >
            Autonomous Mastery Prototyping Laboratory
          </Typography>
        </Box>
      </Box>

      {/* Spotlight */}
      <Box sx={{ position: "relative", flex: 1, minHeight: 0, my: u(5) }}>
        <AnimatePresence mode="wait">
          {!order ? null : project ? (
            <Spotlight key={`${round}-${index}`} project={project} />
          ) : (
            <Typography
              sx={{
                fontFamily: FONT,
                color: TEXT,
                fontSize: u(5),
                textAlign: "center",
                mt: u(25),
              }}
            >
              Projects coming soon.
            </Typography>
          )}
        </AnimatePresence>
      </Box>

      {/* Progress */}
      <Box sx={{ height: u(0.8), backgroundColor: RED_DARK }}>
        {count > 1 && (
          <motion.div
            key={`progress-${round}-${index}`}
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
          px: u(7),
          py: u(2.5),
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: u(3),
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Got a project idea? Learn how to get started.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: u(2.5) }}>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: u(3.4),
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
              height: u(9),
              width: u(9),
              backgroundColor: "#fff",
              p: u(0.8),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

// Load every project with its cover image from repos.yaml at build time
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
