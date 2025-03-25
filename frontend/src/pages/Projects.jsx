import React from "react";
import { motion } from "framer-motion";
import Games from "../components/Games";
import Websites from "../components/Websites";
import Videos from "../components/Videos";
import Documentaries from "../components/Documentaries";
import DigitalArt from "../components/DigitalArt";

const ExploreProjects = () => {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      <motion.h1
        className="text-5xl font-lilita text-center mb-8 mt-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Explore Projects
      </motion.h1>
      
      <div className="space-y-12">
        <Games />
        <Websites />
        <Videos />
        <Documentaries />
        <DigitalArt />
      </div>
    </div>
  );
};

export default ExploreProjects;
