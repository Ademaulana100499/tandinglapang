import React, { useRef, useState } from "react";
import { Cards } from "./components/Cards";
export const HeroSection1 = () => {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-neutral-950">
      <h2 className="relative z-0 text-[20vw] font-black text-neutral-800 md:text-[200px] text-center">
        TandingLapang
      </h2>
      <Cards />
    </section>
  );
};
