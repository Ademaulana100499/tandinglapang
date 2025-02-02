import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const Block = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        hidden: { scale: 0.5, y: 50, opacity: 0 },
        visible: { scale: 1, y: 0, opacity: 1 },
      }}
      whileInView="visible"
      initial="hidden"
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 180,
        damping: 30,
      }}
      viewport={{ once: false, amount: 0.2 }}
      className={twMerge(
        "col-span-4 border border-zinc-700 bg-white p-6",
        className
      )}
      {...rest}
    />
  );
};

export default Block;
