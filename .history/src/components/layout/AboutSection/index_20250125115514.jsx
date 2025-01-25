import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiMail, FiMapPin } from "react-icons/fi";
import { SiFacebook, SiTiktok, SiInstagram, SiYoutube } from "react-icons/si";

export const AboutSection = () => {
  return (
    <div id="about" className="min-h-screen bg-white px-4 py-12 text-black">
      <p className="flex items-center justify-center text-3xl sm:text-4xl lg:text-6xl md:text-6xl font-bold uppercase mb-16 text-black">
        <span>Tentang Kami</span>
      </p>
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.05 }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4">
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <LocationBlock />
        <ContactUsBlock />
      </motion.div>
      <Footer />
    </div>
  );
};

const Block = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: { scale: 0.5, y: 50, opacity: 0 },
        animate: { scale: 1, y: 0, opacity: 1 },
      }}
      transition={{ type: "spring", mass: 3, stiffness: 400, damping: 50 }}
      className={twMerge(
        "col-span-4 rounded-lg border border-zinc-700 bg-neutral-100 p-6",
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <h1 className="mb-12 text-3xl font-medium leading-tight">
      <span className="text-4xl">SewaLapang</span>{" "}
      <span className="text-zinc-600">
        adalah platform yang memudahkan kamu dalam mencari, membooking, dan
        menikmati berbagai jenis lapangan olahraga.
      </span>
    </h1>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block className="col-span-6 bg-[#de3aad] md:col-span-3">
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white">
        <SiInstagram />
      </a>
    </Block>
    <Block className="col-span-6 bg-blue-500 md:col-span-3">
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white">
        <SiFacebook />
      </a>
    </Block>
    <Block className="col-span-6 bg-zinc-50 md:col-span-3">
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-black">
        <SiTiktok />
      </a>
    </Block>
    <Block className="col-span-6 bg-red-500 md:col-span-3">
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white">
        <SiYoutube />
      </a>
    </Block>
  </>
);

const AboutBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <p>
      <span className="text-black text-4xl">Misi kami </span>
      <span className="text-zinc-600">
        adalah membantu komunitas olahraga untuk lebih mudah mengakses lapangan
        berkualitas, mempererat kebersamaan, serta mendukung gaya hidup sehat
        melalui olahraga.
      </span>
    </p>
  </Block>
);

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center  md:col-span-3">
    <div className="text-center">
      <p className="font-semibold text-lg">Jam Operasional</p>
      <p className="text-zinc-600">Senin - Jumat: 08.00 - 17.00</p>
      <p className="text-zinc-600">Sabtu - Minggu: 09.00 - 15.00</p>
    </div>
    <p className="text-center text-lg font-semibold mt-4 mb-1">Lokasi Kami</p>
    <FiMapPin className="text-2xl  mb-1" />
    <p className="text-center text-zinc-600">
      Jl. Pasir Awi No.9, Ps. Kemis, Kec. Ps. Kemis, Kabupaten Tangerang, Banten
      15560
    </p>
  </Block>
);

const Footer = () => {
  return (
    <footer className="mt-12 bg-black text-white py-6 text-center">
      <p className="mb-3">
        Made with ❤️ by{" "}
        <a href="#" className="text-red-400 hover:underline">
          @tomisloading
        </a>
      </p>
      <div className="flex justify-center space-x-4">
        <a href="#" className="text-xl hover:text-red-500">
          <SiInstagram />
        </a>
        <a href="#" className="text-xl hover:text-blue-500">
          <SiFacebook />
        </a>
        <a href="#" className="text-xl hover:text-black">
          <SiTiktok />
        </a>
        <a href="#" className="text-xl hover:text-red-500">
          <SiYoutube />
        </a>
      </div>
    </footer>
  );
};
