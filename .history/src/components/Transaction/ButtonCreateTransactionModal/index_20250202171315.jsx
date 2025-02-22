import { AnimatePresence, motion } from "framer-motion";
import { PaymentMethodModal } from "../PaymentMethodModal";
import { useState } from "react";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export const CreateTransactionModal = ({ isOpen, setIsOpen, activityData }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const paymentFees = { 1: 4000, 2: 3000, 3: 4000, 4: 5000 };
  const router = useRouter();

  const handleCreateTransaction = async () => {
    if (!selectedPayment) {
      Swal.fire({
        title: "Metode pembayaran belum dipilih!",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Konfirmasi Transaksi",
      text: "Apakah kamu yakin ingin membuat transaksi ini?",
      showCancelButton: true,
      confirmButtonColor: "#31c360",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Buat Transaksi!",
      cancelButtonText: "Batal",
    });

    if (!confirmResult.isConfirmed) return;

    const token = getCookie("token");
    const payload = {
      sport_activity_id: activityData?.id,
      payment_method_id: selectedPayment.id,
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

      const result = await response.json();
      if (!response.ok) throw new Error("Gagal membuat transaksi");

      Swal.fire({
        title: "Transaksi Berhasil!",
        icon: "success",
        confirmButtonColor: "#31c360",
      });
      router.push(`/my-transaction/${result.result.id}`);
      setIsOpen(false);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#d33",
      });
      console.error("Error:", error);
    }
  };

  const handleSelectPayment = (method) => {
    setSelectedPayment({ id: method.id, image_url: method.image_url });
    setIsPaymentModalOpen(false);
  };

  const serviceFee = paymentFees[selectedPayment?.id] || 0;
  const totalAmount = (activityData?.price || 0) + serviceFee;

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
                <h3 className="text-2xl font-bold mb-4">Detail Transaksi</h3>
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
                      <span>Biaya Pendaftaran</span>
                      <span className="font-bold">
                        Rp. {activityData?.price || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Biaya Layanan</span>
                      <span className="ml-2">Rp. {serviceFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Metode Pembayaran</span>
                      <span className="font-bold">
                        {selectedPayment ? (
                          <div className="flex items-center">
                            <img
                              src={selectedPayment.image_url}
                              alt="Metode Pembayaran"
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
                      Rp. {totalAmount}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="text-green-600 mt-2 text-sm hover:underline">
                  Pilih Metode Pembayaran
                </button>
                <button
                  onClick={handleCreateTransaction}
                  className="w-full mt-6 py-3 transition-all bg-green-600 text-white hover:bg-green-700">
                  Buat Transaksi
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
        isOpen={isPaymentModalOpen}
        setIsOpen={setIsPaymentModalOpen}
        onSelect={handleSelectPayment}
      />
    </>
  );
};
