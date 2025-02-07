import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { getCookie } from "cookies-next";

const useEditCategorySport = (setIsOpen, categoryId) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFormEdit = async (e) => {
    e.preventDefault();

    // Validasi form sebelum dikirim
    if (formData.name.trim() === "") {
      Swal.fire({
        title: "Kolom harus diisi!",
        text: "Pastikan Kategori Anda telah diisi.",
        icon: "warning",
        confirmButtonColor: "#31c360",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Mengirim data kategori yang diperbarui
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sport-categories/update/${categoryId}`,
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

  return { handleFormEdit, setFormData, formData, isLoading };
};

export default useEditCategorySport;
