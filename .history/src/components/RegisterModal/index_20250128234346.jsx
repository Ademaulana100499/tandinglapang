import { AnimatePresence, motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";
import useRegister from "@/hooks/useRegister";
import { BarLoader } from "../Loading";

export const RegisterModal = ({ isOpen, setIsOpen, role }) => {
  const { formData, setFormData, handleFormRegister, isLoading } =
    useRegister(setIsOpen);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (role) {
      setFormData((prev) => ({ ...prev, role }));
    }
  }, [role, setFormData]);

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
            className="bg-white p-6 shadow-xl w-full max-w-md text-gray-800 relative">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-500 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <FiUser className="text-white text-3xl" />
              </div>

              {formData.role === "admin" && (
                <h3 className="text-2xl font-bold mb-2">Daftar Akun Admin</h3>
              )}
              {formData.role === "user" && (
                <h3 className="text-2xl font-bold mb-2">Daftar Akun User</h3>
              )}
              {formData.role === "admin" && (
                <p className="text-gray-600 text-sm mb-4">
                  Daftarkan acara Anda sekarang dan mulai terima anggota dengan
                  mudah!
                </p>
              )}
              {formData.role === "user" && (
                <p className="text-gray-600 text-sm mb-4">
                  Daftarkan dirimu sekarang dan temukan lapangan olahraga
                  terbaik untuk aktivitas seru kamu!
                </p>
              )}

              <form className="w-full">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 mb-4"
                />
                <input
                  type="teks"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 mb-4"
                />
                <div className="relative mb-4">
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
                      <img
                        src="/close.png"
                        width={28}
                        height={28}
                        alt="close"
                      />
                    ) : (
                      <img src="/open.png" width={28} height={28} alt="open" />
                    )}
                  </button>
                </div>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.c_password}
                    onChange={(e) =>
                      setFormData({ ...formData, c_password: e.target.value })
                    }
                    placeholder="Konfirmasi Kata Sandi"
                    className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700">
                    {showPassword ? (
                      <img
                        src="/close.png"
                        width={28}
                        height={28}
                        alt="close"
                      />
                    ) : (
                      <img src="/open.png" width={28} height={28} alt="open" />
                    )}
                  </button>
                </div>
                <button
                  type="submit"
                  onClick={handleFormRegister}
                  className="w-full bg-green-600 text-white flex items-center justify-center py-3 hover:bg-green-700 transition-all">
                  {isLoading ? (
                    <span>
                      <BarLoader />
                    </span>
                  ) : (
                    "Daftar"
                  )}
                </button>
              </form>

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
