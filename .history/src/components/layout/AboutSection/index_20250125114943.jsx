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
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <div className="text-center">
      <p className="font-semibold text-lg">Jam Operasional</p>
      <p className="text-zinc-600">Senin - Jumat: 08.00 - 17.00</p>
      <p className="text-zinc-600">Sabtu - Minggu: 09.00 - 15.00</p>
    </div>
    <p className="text-center text-lg font-semibold">Lokasi Kami</p>
    <FiMapPin className="text-2xl" />
    <p className="text-center text-zinc-600">
      Jl. Pasir Awi No.9, Ps. Kemis, Kec. Ps. Kemis, Kabupaten Tangerang, Banten
      15560
    </p>
  </Block>
);

const ContactUsBlock = () => (
  <Block className="col-span-12 md:col-span-9">
    <p className="text-lg font-semibold text-black">Hubungi Kami</p>
    <p className="mb-3 text-zinc-600">
      Kami siap membantu! Kirimkan pertanyaan atau saranmu di sini.
    </p>
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Nama Anda"
        className="w-full rounded border border-zinc-700 bg-white px-3 py-1.5 transition-colors focus:border-green-500 focus:outline-none"
      />
      <input
        type="email"
        placeholder="Email Anda"
        className="w-full rounded border border-zinc-700 bg-white px-3 py-1.5 transition-colors focus:border-green-500 focus:outline-none"
      />
      <textarea
        placeholder="Pesan Anda"
        rows="4"
        className="w-full rounded border border-zinc-700 bg-white px-3 py-1.5 transition-colors focus:border-green-500 focus:outline-none"></textarea>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded bg-green-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600">
        <FiMail /> Kirim Pesan
      </button>
    </form>
  </Block>
);

const Footer = () => {
  return (
    <footer className="mt-12">
      <p className="text-center text-zinc-400">
        Made with ❤️ by{" "}
        <a href="#" className="text-red-300 hover:underline">
          @tomisloading
        </a>
      </p>
    </footer>
  );
};
