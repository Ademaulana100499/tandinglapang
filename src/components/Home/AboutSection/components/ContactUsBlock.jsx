import React from "react";
import Block from "./Block";
import { FiMail } from "react-icons/fi";

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
        className="flex items-center justify-center gap-2 bg-green-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600">
        <FiMail /> Kirim Pesan
      </button>
    </form>
  </Block>
);

export default ContactUsBlock;
