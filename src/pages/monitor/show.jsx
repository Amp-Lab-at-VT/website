"use client";
import { promises as fs } from "fs";
import YAML from "yaml";

import React, { useState, useEffect } from "react";
import { Box, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";

const DriftingImage = ({ src }) => {
  const [position, setPosition] = useState({
    top: "0vh",
    width: "100px",
    resetKey: 0,
  });

  const getRandomPosition = () => {
    return {
      top: Math.random() * 70 + "vh", // Random height position between 0 and 70% of viewport height
      width: Math.random() * 20 + 20 + "vh", // Random width between 50px and 150px
      resetKey: Math.random(), // Add a reset key to force re-render
    };
  };

  // Update the position when off screen
  const resetPosition = () => {
    setPosition(getRandomPosition());
  };

  useEffect(() => {
    resetPosition(); // Set initial random position
  }, []);

  return (
    <motion.img
      key={position.resetKey} // Use resetKey to force new animation on each reset
      src={src}
      alt="Drifting Image"
      style={{
        position: "absolute",
        top: position.top,
        width: position.width,
      }}
      animate={{ x: "100vw" }} // Animate from left to right
      initial={{ x: "-100vw" }} // Start off screen from the left
      transition={{
        duration: Math.random() * 20 + 15, // Random speed between 8 and 20 seconds
        ease: "linear",
      }}
      onAnimationComplete={resetPosition} // Reset when off-screen
    />
  );
};

const Page = ({ images }) => {
  let scale = 8;

  const scaledChipSx = {
    height: `${scale * 32}px`,
    borderRadius: `${scale * 16}px`,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    "& .MuiChip-label": {
      paddingRight: `${scale * 12}px`,
      paddingLeft: `${scale * 12}px`,
      fontSize: `${scale * 0.8125}rem`,
    },
    "& .MuiChip-avatar": {
      width: `${scale * 24}px`,
      height: `${scale * 24}px`,
      fontSize: `${scale * 0.75}rem`,
    },
    color: "rgba(185, 18, 18, 0.8)",
  };

  return (
    <Box
      id="Override"
      sx={{
        position: "absolute", // Fixed position to stay on top when scrolling
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        pointerEvents: "none", // Prevent interaction with the drifting layer
      }}
    >
      <Typography
        variant="h1"
        sx={{
          position: "relative",
          m: "10px",
          zIndex: 1,
          color: "rgba(185, 18, 18, 0.8)",
        }}
      >
        The Amp Lab at Virginia Tech
      </Typography>
      <Typography
        variant="h4"
        sx={{
          position: "relative",
          m: "10px",
          zIndex: 1,
          color: "rgba(185, 18, 18, 0.8)",
        }}
      >
        Come in and start a project today!
      </Typography>
      <Box
        className="drifting-images"
        sx={{ position: "relative", zIndex: 10000000000 }}
      >
        {images.map((image, index) => (
          <DriftingImage key={index} src={image} />
        ))}
      </Box>

      {/* Add the website link as a Chip at the bottom right */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          m: "10px",
          zIndex: 10000000001, // Keep the chip above everything else
          pointerEvents: "auto", // Enable interaction with the link
        }}
      >
        <Chip
          label="amp-lab.org"
          component="a"
          href="https://amp-lab.org"
          target="_blank"
          rel="noreferrer"
          clickable
          size="large"
          sx={scaledChipSx}
        />
      </Box>
    </Box>
  );
};

// Pull in all the project images using getStaticProps
export async function getStaticProps() {
  const file = "repos.yaml";
  const fileContents = await fs.readFile(process.cwd() + "/" + file, "utf8");
  var projects = YAML.parse(fileContents);

  const getDifference = (str1, str2) => {
    let diff = "";
    str2.split("").forEach(function (val, i) {
      if (val !== str1.charAt(i)) diff += val;
    });
    return diff;
  };

  // Get the hero image for each project
  for (var key in projects) {
    var url = projects[key]["url"];
    var branch = projects[key]["branch"];
    var repo = url.split("/")[4];
    var owner = url.split("/")[3];

    var diff = getDifference("https://github.com/", url);

    var image =
      "https://raw.githubusercontent.com/" + diff + "/" + branch + "/hero.png";

    projects[key]["image"] = image;
  }

  const images = Object.values(projects).map((project) => project["image"]);

  return {
    props: {
      images,
    },
  };
}

export default Page;
