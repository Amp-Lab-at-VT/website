import React from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

const ParallaxPage = () => {
  return (
    <ParallaxProvider>
      <div className="flex flex-col justify-center items-center">
        <div>
        <h1 className="text-4xl mb-8">Scroll down to see the parallax effect!</h1>
        <hr/>
        </div>
        <div className="h-screen w-full flex justify-center items-center">
          <Parallax speed = {300} translateY={[-20, 20]} easing={[0.2, -0.6, 1, -0.6]}>
            <div className="h-80 w-80 bg-red-500"></div>
          </Parallax>
        </div>
        {/* <div className="h-screen"/> */}
        <hr></hr>
        <div className="h-screen w-full flex justify-center items-center">
          <Parallax speed={-200} translateY={[-200, 200]}>
            <div className="h-80 w-80 bg-blue-500"></div>
          </Parallax>
        </div>
        <hr></hr>
        <div className="h-screen w-full flex justify-center items-center">
          <Parallax speed={60} translateY={[-40, 40]}>
            <div className="h-80 w-80 bg-green-500"></div>
          </Parallax>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default ParallaxPage;
