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
      whileHover="hovered"
      animate="animate"
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-6xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl tracking-widest"
      style={{
        lineHeight: 0.999,
      }}>
      <motion.div
        animate={{
          y: ["0%", "-100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}>
            {l}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        animate={{
          y: ["100%", "0%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}>
            {l}
          </motion.span>
        ))}
      </motion.div>
    </motion.a>
  );
};
