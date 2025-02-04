import { useState } from "react";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export const useTransaction = ({ activityData, setIsOpen }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const paymentFees = { 1: 0, 2: 0, 3: 0, 4: 0 };
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

  return {
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    selectedPayment,
    handleCreateTransaction,
    handleSelectPayment,
    serviceFee,
    totalAmount,
  };
};
