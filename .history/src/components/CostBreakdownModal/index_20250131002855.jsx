import { AnimatePresence, motion } from "framer-motion";
import { PaymentMethodModal } from "../PaymentMethodModal";
import { useState } from "react";

export const CostBreakdownModal = ({ isOpen, setIsOpen, data }) => {
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod({
      id: method.id, // Simpan hanya ID
      image_url: method.image_url, // Simpan hanya URL gambar
    });
    setIsPaymentMethodOpen(false); // Tutup modal pembayaran
  };

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      alert("Silakan pilih metode pembayaran terlebih dahulu.");
      return;
    }
    // Lanjutkan ke proses pembayaran
    console.log("Pembayaran diproses dengan metode:", selectedPaymentMethod);
  };

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
              className="bg-white p-6 shadow-xl w-full max-w-md text-gray-800 relative rounded-lg">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold mb-2">Rincian Biaya</h3>
                <div>
                  <p>{data?.description}</p>
                  <p>{data?.duration}</p>
                  <p>{data?.location}</p>
                </div>

                <div className="w-full text-left">
                  <div className="flex justify-between py-2 border-b">
                    <span>Pendaftaran</span>
                    <span className="font-bold">Rp. {data?.price || 0}</span>
                  </div>
                  <div className="flex justify-between items-center  py-2 border-b">
                    <span>Biaya Layanan</span>
                    <span className="font-bold">Rp. 0</span>
                  </div>
                  <div className="flex justify-between items-center  py-2 border-b">
                    <span>Metode Pembayaran</span>
                    <span className="font-bold">
                      {selectedPaymentMethod ? (
                        <div className="flex items-center">
                          <img
                            src={selectedPaymentMethod.image_url}
                            alt="Payment Method"
                            className="w-8 h-8 mr-2"
                          />
                        </div>
                      ) : (
                        "Belum dipilih"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-t mt-4 pt-2">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-green-600">
                      Rp. {data?.price || 0}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsPaymentMethodOpen(true)}
                  className="w-full mt-6 bg-green-600 text-white py-3 hover:bg-green-700 transition-all">
                  Pilih Metode Pembayaran
                </button>

                <button
                  onClick={handlePayment}
                  disabled={!selectedPaymentMethod}
                  className={`w-full mt-6 py-3 transition-all ${
                    selectedPaymentMethod
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}>
                  Lanjut Pembayaran
                </button>

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

      {/* PaymentMethodModal Harus Berada di Luar AnimatePresence Agar Tidak Konflik */}
      <PaymentMethodModal
        isOpen={isPaymentMethodOpen}
        setIsOpen={setIsPaymentMethodOpen}
        onSelect={handlePaymentMethodSelect} // Pass function to set selected payment method
      />
    </>
  );
};
