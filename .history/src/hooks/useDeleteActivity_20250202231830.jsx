import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

export const useDeletedActivity = () => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!transactionId) {
      Swal.fire({
        title: "Error",
        text: "Activity ID tidak ditemukan!",
        icon: "error",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Konfirmasi Hapus Acara",
      icon: "warning",
      text: "Apakah kamu yakin ingin menghapus acara ini?",
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
        `${process.env.NEXT_PUBLIC_API_URL}/sport-activities/delete/${transactionId}`,
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
    } finally {
      setLoading(false);
    }
  };

  return { handleCancel, loading };
};
