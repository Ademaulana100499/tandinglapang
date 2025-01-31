import { AnimatePresence, motion } from "framer-motion";
import { PaymentMethodModal } from "../PaymentMethodModal";
import { useState } from "react";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";
export const CostBreakdownModal = ({ isOpen, setIsOpen, activityData }) => {
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const paymentMethodFees = {
    1: 4000,
    2: 3000,
    3: 4000,
    4: 5000,
  };
  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      Swal.fire({
        title: "Metode pembayaran belum dipilih!",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
      return;
    }
    const token = getCookie("token");
    const payload = {
      sport_activity_id: activityData?.id,
      payment_method_id: selectedPaymentMethod.id,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal melakukan transaksi");
      }

      const result = await response.json();
      alert("Pembayaran berhasil!");
      console.log("Response:", result);

      setIsOpen(false);
    } catch (error) {
      alert(error.message);
      console.error("Error:", error);
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod({
      id: method.id,
      image_url: method.image_url,
    });
    setIsPaymentMethodOpen(false);
  };
  const serviceFee = paymentMethodFees[selectedPaymentMethod?.id] || 0;
  const totalCost = (activityData?.price || 0) + serviceFee;

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
                <h3 className="text-2xl font-bold mb-4">Rincian Biaya</h3>
                <div className="w-full text-left space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg">
                      {activityData?.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Tanggal: {activityData.activity_date}
                    </p>
                    <p className="text-sm text-gray-600">
                      Waktu: {activityData.start_time} - {activityData.end_time}
                    </p>
                    <p className="text-sm text-gray-600">
                      Lokasi: {activityData?.address}
                    </p>
                  </div>
                  <div className="border-t border-b py-2 space-y-2">
                    <div className="flex justify-between">
                      <span>Pendaftaran</span>
                      <span className="font-bold">
                        Rp. {activityData?.price || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Biaya Layanan</span>
                      <span className="ml-2">
                        Rp. {paymentMethodFees[selectedPaymentMethod.id]}
                      </span>
                    </div>
                    <div className="flex justify-between">
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
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-4">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-green-600">
                      Rp. {totalCost}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsPaymentMethodOpen(true)}
                  className="text-green-600 mt-2 text-sm hover:underline">
                  Pilih Metode Pembayaran
                </button>

                <button
                  onClick={handlePayment}
                  className="w-full mt-6 py-3 transition-all bg-green-600 text-white hover:bg-green-700">
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
      <PaymentMethodModal
        isOpen={isPaymentMethodOpen}
        setIsOpen={setIsPaymentMethodOpen}
        onSelect={handlePaymentMethodSelect}
      />
    </>
  );
};
