import React from "react";
import Block from "./Block";
import { SiFacebook, SiTiktok, SiInstagram, SiYoutube } from "react-icons/si";

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-[#de3aad] md:col-span-3">
      <a
        href="https://www.instagram.com"
        target="_blank"
        className="grid h-full place-content-center text-3xl text-white">
        <SiInstagram />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-blue-500 md:col-span-3">
      <a
        href="https://www.facebook.com"
        target="_blank"
        className="grid h-full place-content-center text-3xl text-white">
        <SiFacebook />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-zinc-50 md:col-span-3">
      <a
        href="https://www.tiktok.com"
        target="_blank"
        className="grid h-full place-content-center text-3xl text-black">
        <SiTiktok />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-red-500 md:col-span-3">
      <a
        href="https://www.youtube.com"
        target="_blank"
        className="grid h-full place-content-center text-3xl text-white">
        <SiYoutube />
      </a>
    </Block>
  </>
);

export default SocialsBlock;
