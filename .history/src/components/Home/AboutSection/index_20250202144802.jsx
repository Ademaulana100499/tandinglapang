import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import HeaderBlock from "./HeaderBlock";
import SocialsBlock from "./SocialsBlock";
import AboutBlock from "./AboutBlock";
import LocationBlock from "./LocationBlock";
import ContactUsBlock from "./ContactUsBlock";

export const AboutSection = () => {
  return (
    <div id="about" className="min-h-screen bg-white px-4 py-12 text-black">
      <p className="flex items-center justify-center text-3xl sm:text-4xl lg:text-6xl md:text-6xl font-bold uppercase mb-12 text-black">
        <span>Tentang Kami</span>
      </p>
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-6xl grid-flow-dense grid-cols-12 gap-4">
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <LocationBlock />
        <ContactUsBlock />
      </motion.div>
    </div>
  );
};
