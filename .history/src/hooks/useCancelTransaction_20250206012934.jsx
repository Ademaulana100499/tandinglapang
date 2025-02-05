import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

export const useCancelTransaction = (transactionId, updateTransactions) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!transactionId) {
      Swal.fire({
        title: "Error",
        text: "Transaction ID tidak ditemukan!",
        icon: "error",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Konfirmasi Pembatalan",
      icon: "warning",
      text: "Apakah kamu yakin ingin membatalkan transaksi ini?",
      showCancelButton: true,
      confirmButtonColor: "#31c360",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Lanjutkan!",
      cancelButtonText: "Batal",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/cancel/${transactionId}`,
        {
          status: "success",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      updateTransactions(transactionId);

      Swal.fire({
        title: "Transaksi Dibatalkan!",
        icon: "success",
        confirmButtonColor: "#31c360",
      });
      window.location.reload();
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        title: "Gagal Membatalkan",
        text: "Terjadi kesalahan saat membatalkan transaksi.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleCancel, loading };
};
