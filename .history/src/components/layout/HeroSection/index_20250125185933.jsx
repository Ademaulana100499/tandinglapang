import React from "react";
import { motion } from "framer-motion";

export const RevealLinks = () => {
  return (
    <section className="grid place-content-center gap-4 bg-green-400 px-8 py-16 text-black">
      <FlipLink>Rasakan </FlipLink>
      <FlipLink>Sensasi</FlipLink>
      <FlipLink>Lapangan</FlipLink>
      <FlipLink>Terbaik!</FlipLink>
    </section>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }) => {
  return (
    <motion.a
      initial="initial"
      animate="animate"
      whileHover="hovered"
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-6xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl tracking-widest"
      style={{
        lineHeight: 0.999,
      }}>
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              animate: {
                y: ["0%", "-100%"], // Gerakan bergerak terus menerus
              },
              hovered: {
                y: ["0%", "-100%"], // Efek hover tidak mengganggu animasi
              },
            }}
            transition={{
              duration: DURATION,
              ease: "linear", // Animasi bergerak terus tanpa melambat
              repeat: Infinity, // Ulang terus menerus
              repeatType: "loop", // Loop animasi
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}>
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              animate: {
                y: 0,
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "linear",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}>
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};
