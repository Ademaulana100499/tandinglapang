import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin } from "react-icons/fi";
import { SiFacebook, SiTiktok, SiInstagram, SiYoutube } from "react-icons/si";
import Block from "./Block";
import HeaderBlock from "./HeaderBlock";
import SocialsBlock from "./SocialsBlock";
import AboutBlock from "./AboutBlock";
import LocationBlock from "./LocationBlock";
export const AboutSection = () => {
  return (
    <div id="about" className=" min-h-screen  bg-white px-4 py-12 text-black">
      <p className="flex items-center justify-center text-3xl sm:text-4xl  lg:text-6xl  md:text-6xl font-bold uppercase mb-12  text-black">
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

const ContactUsBlock = () => (
  <Block className="col-span-12 md:col-span-9">
    <p className="text-lg font-semibold text-black">Hubungi Kami</p>
    <p className="mb-3 text-zinc-600">
      {" "}
      Kami siap membantu! Kirimkan pertanyaan atau saranmu di sini.
    </p>
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Nama Anda"
        className="w-full  border border-zinc-700 bg-white px-3 py-1.5 transition-colors focus:border-green-500 focus:outline-none"
      />
      <input
        type="email"
        placeholder="Email Anda"
        className="w-full  border border-zinc-700 bg-white px-3 py-1.5 transition-colors focus:border-green-500 focus:outline-none"
      />
      <textarea
        placeholder="Pesan Anda"
        rows="4"
        className="w-full  border border-zinc-700 bg-white px-3 py-1.5 transition-colors focus:border-green-500 focus:outline-none"></textarea>
      <button
        type="submit"
        className="flex items-center justify-center gap-2  bg-green-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600">
        <FiMail /> Kirim Pesan
      </button>
    </form>
  </Block>
);
