import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const PolySnow = () => {
  const particlesInit = async (main) => {
    return await loadFull(main); // Ensure full loading
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false, // Keep it inside your layout
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: false,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "polygon",
            polygon: {
              nb_sides: 5, // Defines pentagon-shaped particles
            },
          },
          opacity: {
            value: 0.24,
            random: true,
          },
          size: {
            value: 8,
            random: true,
          },
          move: {
            enable: true,
            speed: 6,
            direction: "bottom",
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
            onClick: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            bubble: {
              distance: 400,
              size: 4,
              duration: 0.3,
              opacity: 0.4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
      }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: -1, // Ensures it stays behind content
      }}
    />
  );
};

export default PolySnow;
