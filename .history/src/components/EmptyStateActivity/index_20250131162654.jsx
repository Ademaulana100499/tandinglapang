import { FaRegSadCry } from "react-icons/fa";
import { motion } from "framer-motion";

export const EmptyState = () => (
  <div className="w-full flex justify-center items-center text-white text-lg p-10 relative">
    <div className="absolute inset-0 bg-green-600 "></div>
    <motion.div
      className="relative text-center p-6 shadow-xl bg-gradient-to-r from-green-400 to-green-700 transform transition-all duration-500"
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}>
      <div className="flex justify-center mb-4">
        <FaRegSadCry className="text-6xl text-white animate__animated animate__fadeIn" />
      </div>
      <div className="flex justify-center mb-4">
        <div>
          <p className="text-3xl font-semibold animate__animated animate__fadeIn animate__delay-1s">
            <span className="font-bold text-white">Lawan sparring</span> belum
            tersedia...
          </p>
        </div>
      </div>
      <p className="text-lg font-medium text-gray-100">
        Coba cari lawan lain atau kembali nanti!
      </p>
    </motion.div>
  </div>
);
