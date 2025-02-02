import { useState } from "react";
import { RegisterModal } from "@/components/Authentication/RegisterModal";
import { ShuffleGrid } from "./components/ShuffleGrid";

export const AdminSection = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [role, setRole] = useState("");

  const openModalWithRole = (selectedRole) => {
    setRole(selectedRole);
    setIsRegisterOpen(true);
  };

  return (
    <div className="bg-black px-4 py-12">
      <section className="w-full   grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
        <div>
          <span className="block mb-4 text-xs md:text-sm text-green-400 font-medium">
            Bergabunglah bersama kami
          </span>
          <h3 className="text-4xl md:text-6xl text-white font-semibold">
            Buat Acara Anda Sekarang
          </h3>
          <p className="text-base md:text-lg text-white my-4 ">
            Sebagai penyedia acara, Anda dapat mengelola acara Anda dengan mudah
            dan menghubungkannya dengan para peserta.
          </p>
          <button
            onClick={() => openModalWithRole("admin")}
            className="bg-green-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-green-700 active:scale-95">
            Daftar Sebagai Penyedia Acara
          </button>
        </div>
        <ShuffleGrid />
      </section>
      <RegisterModal
        isOpen={isRegisterOpen}
        setIsOpen={setIsRegisterOpen}
        role={role}
      />
    </div>
  );
};
