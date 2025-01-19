"use client";
import React, { useState, useEffect } from "react";
import { Box, Text } from "@mantine/core";
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

import { getStaticProps } from "./actions";
export default function () {
  const images = getStaticProps().props.images;
  return (
    <Box id="Override" >
      {images.map((image, index) => (
          <DriftingImage key={index} src={image} />
        ))}
    </Box>
  );
};
