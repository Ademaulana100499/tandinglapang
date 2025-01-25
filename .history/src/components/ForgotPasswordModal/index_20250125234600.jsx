import { AnimatePresence, motion } from "framer-motion";
import Swal from "sweetalert2";
import useLogin from "@/hooks/useLogin";

export const ForgotPasswordModal = ({ isOpen, setIsOpen }) => {
  const { formData, setFormData } = useLogin();

  return (
    <>
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
                <h3 className="text-2xl font-bold mb-2">Lupa Kata Sandi?</h3>
                <p className="text-gray-600 mb-6">
                  Masukkan email Anda untuk reset kata sandi.
                </p>

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
                          confirmButtonColor: "#31c360",
                        }).then(() => setIsOpen(false));
                      }
                    }}
                    className="w-full bg-green-600 text-white py-3 hover:bg-green-700 transition-all">
                    Kirim Link Reset
                  </button>
                </form>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    setIsLoginOpen(true);
                  }}
                  className="text-green-600 mb-3 mt-2 text-sm hover:underline">
                  Kembali Masuk
                </button>
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
    </>
  );
};
