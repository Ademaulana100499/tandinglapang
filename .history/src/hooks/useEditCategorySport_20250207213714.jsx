import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

export const useEditCategorySport = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFormEdit = async (
    e,
    id,
    formData,
    fetchCategories,
    setIsOpen,
    setFormData
  ) => {
    e.preventDefault();

    if (formData.name.trim() === "") {
      Swal.fire({
        title: "Kolom harus diisi!",
        text: "Pastikan Kategori Anda telah diisi.",
        icon: "warning",
        confirmButtonColor: "#31c360",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Konfirmasi Perubahan kategori",
      icon: "warning",
      text: "Apakah kamu yakin ingin mengupdate kategori ini?",
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
      setIsLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sport-categories/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      Swal.fire({
        title: "Berhasil memperbarui kategori!",
        icon: "success",
        confirmButtonColor: "#31c360",
      });

      fetchCategories();
      setIsOpen(false);
      setFormData({ name: "" });
    } catch (error) {
      console.error("Error while updating category:", error);
      Swal.fire({
        title: "Gagal memperbarui kategori!",
        text: error.response?.data?.message || "Terjadi kesalahan, coba lagi.",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFormEdit, isLoading };
};
