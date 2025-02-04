import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
export const useDeleteActivity = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (id) => {
    if (!id) {
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
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/sport-activities/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      console.log(res);

      Swal.fire({
        title: "Acara Berhasil Dihapus!",
        icon: "success",
        confirmButtonColor: "#31c360",
      });
      router.push("/explore");
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        title: "Gagal Menghapus Acara",
        text: "Terjadi kesalahan saat menghapus acara.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading };
};
