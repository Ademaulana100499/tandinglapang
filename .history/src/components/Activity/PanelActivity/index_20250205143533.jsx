import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useWindowSize } from "@/hooks/useWindowsSize";

const Panel = ({ open, setOpen, id, Icon, title, imgSrc, item }) => {
  const { width } = useWindowSize();
  const isOpen = open === id;
  const router = useRouter();

  const panelVariants = {
    open: {
      width: "100%",
      height: "100%",
    },
    closed: {
      width: "0%",
      height: "100%",
    },
  };

  const panelVariantsSm = {
    open: {
      width: "100%",
      height: "200px",
    },
    closed: {
      width: "100%",
      height: "0px",
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        delay: 0.125,
      },
    },
    closed: { opacity: 0, y: "100%" },
  };

  return (
    <>
      <button
        className="bg-white hover:bg-slate-50 transition-colors p-3 border-r-[1px] border-b-[1px] border-slate-200 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
        onClick={() => setOpen(id)}>
        <span
          style={{
            writingMode: "vertical-lr",
          }}
          className="hidden lg:block text-xl font-light rotate-180">
          {title}
        </span>
        <span className="block lg:hidden text-xl font-light">{title}</span>
        <div className="w-6 lg:w-full aspect-square bg-green-600 text-white grid place-items-center">
          <Icon />
        </div>
        <span className="w-4 h-4 bg-white group-hover:bg-slate-50 transition-colors border-r-[1px] border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-slate-200 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width && width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-full overflow-hidden relative bg-black">
           import { motion } from "framer-motion";
import { useRouter } from "next/router";

const MyComponent = ({ item, id }) => {
  const router = useRouter();
  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative w-full h-full p-4">
      {/* Top Section */}
      <div className="absolute top-0 left-0 w-full flex flex-col gap-2">
        <motion.div
          variants={itemVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white inline-block">
          <p>{item}</p>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white inline-block">
          <p>Futsal</p>
        </motion.div>
      </div>

      {/* Bottom Left Section */}
      <div className="absolute bottom-0 left-0 w-full flex flex-col gap-2">
        <motion.div
          variants={itemVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white inline-block">
          <p>Rp. 20000</p>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white inline-block">
          <p>Tanggal</p>
        </motion.div>
      </div>

      {/* Bottom Right Section */}
      <div className="absolute bottom-0 right-0">
        <motion.div
          variants={itemVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="px-8 py-2 bg-black/40 backdrop-blur-sm hover:bg-black transition-colors text-white">
          <button onClick={() => router.push(`/explore/${id}`)}>
            Detail
          </button>
        </motion.div>
      </div>
    </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Panel;
