import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
export const useDeleteSportCategory = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (id) => {
    if (!id) {
      Swal.fire({
        title: "Error",
        text: "SportCategory ID tidak ditemukan!",
        icon: "error",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Konfirmasi Hapus Acara",
      icon: "warning",
      text: "Apakah kamu yakin ingin menghapus kategori ini?",
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
        `${process.env.NEXT_PUBLIC_API_URL}/sport-categories/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      console.log(res);

      Swal.fire({
        title: "Kategori Berhasil Dihapus!",
        icon: "success",
        confirmButtonColor: "#31c360",
      });
    } catch (err) {
      console.error("Error:", err.message);
      Swal.fire({
        title: "Gagal Menghapus Kategori",
        text: "Kategori ini tidak dapat dihapus karena ada peserta yang bergabung.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading };
};
