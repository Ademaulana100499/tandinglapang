import { AnimatePresence, motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import { useState } from "react";

export const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-300 px-4 py-2 hover:bg-green-600 hover:text-white bg-green-500 rounded">
        Login
      </button>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

const SpringModal = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-black bg-opacity-60 p-8 fixed inset-0 z-50 flex justify-center items-center cursor-pointer min-h-screen">
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-green-400 to-green-500 text-white p-6 rounded-lg w-full max-w-md shadow-xl cursor-default relative overflow-hidden">
            <span className="text-white/10 rotate-[-12.5deg] text-[70px] absolute z-0 -top-0 -left-3">
              Login
            </span>
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-green-500 grid place-items-center mx-auto">
                <FiUser />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">
                Welcome Back!
              </h3>
              <form className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 rounded bg-white text-black border border-gray-300"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 rounded bg-white text-black border border-gray-300"
                />
                <button
                  type="submit"
                  className="bg-white hover:opacity-90 transition-opacity text-green-500 font-semibold w-full py-2 rounded">
                  Login
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded">
                  Cancel
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
