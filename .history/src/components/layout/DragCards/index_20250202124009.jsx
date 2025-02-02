import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const DragCards = () => {
  return (
    <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-neutral-950">
      <h2 className="relative max-w-6xl z-0 w-screen text-[20vw]  font-black text-neutral-800 md:text-[200px]">
        TandingLapang
      </h2>
      <Cards />
    </section>
  );
};

const Cards = () => {
  const containerRef = useRef(null);

  return (
    <div id="home" className=" absolute top-0 inset-0 z-10" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src="https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/284/2024/11/14/RADENPHOTO-617-970909764.jpg"
        alt="Example image"
        rotate="6deg"
        top="10%"
        left="15%"
        className="w-36 md:w-56"
      />
      <Card
        containerRef={containerRef}
        src="https://images.unsplash.com/photo-1732024009313-1691a2ec6ee7?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="biliard"
        rotate="12deg"
        top="45%"
        left="70%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        src="https://iblindonesia.com/uploads/media/wallpaper-c9679ecf-2852-4d33-82ec-41a77b03869c.jpeg"
        alt="basket"
        rotate="-6deg"
        top="20%"
        left="35%"
        className="w-52 md:w-80"
      />
      <Card
        containerRef={containerRef}
        src="https://kilasjatim.com/wp-content/uploads/2024/12/IMG-20241212-WA0045-2048x1536.jpg"
        alt="badminton"
        rotate="8deg"
        top="50%"
        left="18%"
        className="w-48 md:w-72"
      />
      <Card
        containerRef={containerRef}
        src="https://plus.unsplash.com/premium_photo-1708119178805-321dec8ba9cf?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="tenis"
        rotate="18deg"
        top="10%"
        left="65%"
        className="w-40 md:w-64"
      />
      <Card
        containerRef={containerRef}
        src="https://images.unsplash.com/photo-1630420598913-44208d36f9af?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="futsal"
        rotate="-3deg"
        top="35%"
        left="55%"
        className="w-48 md:w-71"
      />
    </div>
  );
};

const Card = ({ containerRef, src, alt, top, left, rotate, className }) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements absolute w-48 bg-neutral-200 p-1 pb-4",
        className
      )}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      // Uncomment below and remove dragElastic to remove movement after release
      //   dragMomentum={false}
      dragElastic={0.65}
    />
  );
};
