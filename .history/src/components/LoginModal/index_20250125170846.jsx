import { AnimatePresence, motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";

export const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all">
        Masuk
      </button>
      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isRegister={isRegister}
        setIsRegister={setIsRegister}
      />
    </div>
  );
};

const SpringModal = ({ isOpen, setIsOpen, isRegister, setIsRegister }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-black bg-opacity-60 fixed inset-0 z-50 flex justify-center items-center min-h-screen p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-gray-800 relative">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-500 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <FiUser className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {isRegister ? "Daftar Akun" : "Selamat Datang!"}
              </h3>
              <p className="text-gray-600 mb-6">
                {isRegister
                  ? "Buat akun baru Anda"
                  : "Masuk untuk mengakses akun Anda"}
              </p>
              <form className="w-full">
                {isRegister && (
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 mb-4"
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 mb-4"
                />
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Kata Sandi"
                    className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700">
                    {showPassword ? (
                      <Image
                        src="/close.png"
                        width={28}
                        height={28}
                        alt="close"
                      />
                    ) : (
                      <Image
                        src="/open.png"
                        width={28}
                        height={28}
                        alt="open"
                      />
                    )}
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all">
                  {isRegister ? "Daftar" : "Masuk"}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  className="w-full mt-3 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-all">
                  Batal
                </button>
              </form>
              <p className="mt-4 text-gray-600">
                {isRegister ? "Sudah punya akun? " : "Belum punya akun? "}
                <button
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-green-600 font-semibold hover:underline">
                  {isRegister ? "Masuk" : "Daftar"}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
