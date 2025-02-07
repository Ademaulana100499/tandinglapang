import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

export const useUpdateTransaction = (transactionId) => {
  const [loading, setLoading] = useState(false);

  const updateTransactionStatus = async () => {
    if (!transactionId) {
      Swal.fire({
        title: "Error",
        text: "Transaction ID tidak ditemukan!",
        icon: "error",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Konfirmasi Pembayaran",
      icon: "warning",
      text: "Apakah kamu yakin bukti pembayaran sudah benar?",
      showCancelButton: true,
      confirmButtonColor: "#31c360",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Lanjutkan!",
      cancelButtonText: "Batal",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/update-status/${transactionId}`,
        { status: "success" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      Swal.fire({
        title: "Transaksi Berhasil Diupdate!",
        icon: "success",
        confirmButtonColor: "#31c360",
      });
      fetchData();
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        title: "Gagal Memperbarui Transaksi",
        text: "Terjadi kesalahan saat memperbarui transaksi.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { updateTransactionStatus, loading };
};
