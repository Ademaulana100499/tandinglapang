import React from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

import Swal from "sweetalert2";
export const UpdateTransaction = ({ transactionId }) => {
  const handleUpdate = async () => {
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

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/update-status/${transactionId}`,
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

      console.log(res);

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
    }
  };
  return (
    <button
      onClick={handleUpdate}
      className="bg-red-500 px-4 py-2 text-white rounded">
      Update
    </button>
  );
};
