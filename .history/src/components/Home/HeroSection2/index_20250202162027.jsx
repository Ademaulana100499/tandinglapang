import React from "react";
import Flip from "./components/Flip";

export const HeroSection2 = () => {
  return (
    <section className="grid place-content-center gap-3 bg-green-400   py-12 text-black">
      <Flip>Tantang </Flip>
      <Flip>Lawan</Flip>
      <Flip>Tingkatkan</Flip>
      <Flip>Kemampuan</Flip>
    </section>
  );
};
