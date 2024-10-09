"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import { motion } from 'framer-motion';

const DriftingImage = ({ src }) => {
  const [position, setPosition] = useState({ top: '0vh', width: '100px', resetKey: 0 });

  const getRandomPosition = () => {
    return {
      top: Math.random() * 70 + 'vh', // Random height position between 0 and 70% of viewport height
      width: Math.random() * 100 + 150 + 'px', // Random width between 50px and 150px
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
        position: 'absolute',
        top: position.top,
        width: position.width,
      }}
      animate={{ x: '100vw' }} // Animate from left to right
      initial={{ x: '-100vw' }} // Start off screen from the left
      transition={{
        duration: Math.random() * 10 + 5, // Random speed between 5 and 15 seconds
        ease: 'linear',
      }}
      onAnimationComplete={resetPosition} // Reset when off-screen
    />
  );
};

const Page = ({ images }) => {
  return (
    <Box
      id="Override"
      // className = "overrideMFUI"
      sx={{
        position: "absolute", // Fixed position to stay on top when scrolling
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        zIndex: 10000000000, // Very high zIndex to stay above everything
        pointerEvents: "none", // Prevent interaction with the drifting layer
      }}
    >
      <Typography variant="h3" sx={{ position: 'relative', m: "10px", zIndex: 1 }}>
        The Amp Lab at Virginia Tech
      </Typography>
      <Box
        className="drifting-images"
        sx={{ position: 'relative', zIndex:  10000000000 }}
      >
        {images.map((image, index) => (
          <DriftingImage key={index} src={image} />
        ))}
      </Box>
      {/* Add the website link at the bottom right */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          m: "10px",
          zIndex: 1,
        }}
      >
        <Typography variant="body1">
          <a href="https://amp-lab.org" target="_blank" rel="noreferrer">
            amp-lab.org
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

// Pull in all the project images using getStaticProps
export async function getStaticProps() {
  const images = [
    'https://media.istockphoto.com/id/1316134499/photo/a-concept-image-of-a-magnifying-glass-on-blue-background-with-a-word-example-zoom-inside-the.jpg?s=612x612&w=0&k=20&c=sZM5HlZvHFYnzjrhaStRpex43URlxg6wwJXff3BE9VA=',
    // Add more image URLs as needed
  ];

  return {
    props: {
      images,
    },
  };
}

export default Page;
