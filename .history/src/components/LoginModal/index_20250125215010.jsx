import { AnimatePresence, motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
import Image from "next/image";
import useLogin from "@/hooks/useLogin";
import Swal from "sweetalert2";
import { RegisterModal } from "../RegisterModal";
export const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition-all">
        Masuk
      </button>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

const SpringModal = ({ isOpen, setIsOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const { formData, setFormData, handleFormLogin } = useLogin();
  useEffect(() => {
    if (isOpen) {
      setIsForgotPassword(false);
    }
  }, [isOpen]);

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
            className="bg-white p-6  shadow-xl w-full max-w-md text-gray-800 relative">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-500 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <FiUser className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {isForgotPassword ? "Lupa Kata Sandi?" : "Selamat Datang!"}
              </h3>
              <p className="text-gray-600 mb-6">
                {isForgotPassword
                  ? "Masukkan email Anda untuk reset kata sandi."
                  : "Masuk sekarang dan temukan lapangan favorit Anda!"}
              </p>

              {!isForgotPassword ? (
                <form className="w-full">
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 mb-4"
                  />
                  <div className="relative ">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
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
                    onClick={() => setIsForgotPassword(true)}
                    className="text-green-600 w-full flex justify-end mb-3 mt-2 text-sm hover:underline">
                    Lupa Kata Sandi?
                  </button>
                  <button
                    type="submit"
                    onClick={handleFormLogin}
                    className="w-full bg-green-600 text-white py-3  hover:bg-green-700 transition-all">
                    Masuk
                  </button>
                  <div className="flex items-center justify-center mt-4 text-sm">
                    <p className="mr-1">Belum Punya Akun?</p>
                    <p className="text-green-600 hover:underline cursor-pointer">
                      <RegisterModal
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpen(false);
                        }}
                      />
                    </p>
                  </div>
                </form>
              ) : (
                <form className="w-full">
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 mb-4"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.email) {
                        Swal.fire({
                          title: "Email tidak boleh kosong!",
                          icon: "error",
                          confirmButtonColor: "#31c360",
                        });
                      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                        Swal.fire({
                          title: "Format email tidak valid!",
                          icon: "error",
                          confirmButtonColor: "#31c360",
                        });
                      } else {
                        Swal.fire({
                          title: "Email untuk reset kata sandi telah dikirim",
                          icon: "success",
                          draggable: true,
                          confirmButtonColor: "#31c360",
                        }).then(() => {
                          setIsOpen(false);
                        });
                      }
                    }}
                    className="w-full bg-green-600 text-white py-3 hover:bg-green-700 transition-all">
                    Kirim Link Reset
                  </button>

                  <div className="text-center mt-4">
                    <button
                      onClick={() => setIsForgotPassword(false)}
                      className="text-gray-600 hover:underline">
                      Kembali ke Halaman Masuk
                    </button>
                  </div>
                </form>
              )}

              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-3 bg-gray-200 text-gray-700 py-3 hover:bg-gray-300 transition-all">
                Batal
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
