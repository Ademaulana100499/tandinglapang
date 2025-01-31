import { AnimatePresence, motion } from "framer-motion";

export const CostBreakdownModal = ({ isOpen, setIsOpen, data }) => {
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
                <h3 className="text-2xl font-bold mb-2">Rincian Biaya</h3>

                <div className="w-full text-left">
                  <div className="flex justify-between py-2 border-b">
                    <span>Pendaftaran</span>
                    <span className="font-bold">Rp. {data.price}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Biaya Layanan</span>
                    <span className="font-bold">Rp. 4000</span>
                  </div>
                  <div className="flex justify-between py-2 border-t mt-4 pt-2">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-green-600">Rp 300.000</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full mt-6 bg-gray-200 text-gray-700 py-3 hover:bg-gray-300 transition-all">
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
