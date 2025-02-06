import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { getCookie } from "cookies-next";

const useEditCategorySport = (setIsOpen) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFormEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.name === "") {
      Swal.fire({
        title: "Kolom harus diisi!",
        text: "Pastikan Kategori Anda telah diisi.",
        icon: "warning",
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    }
    console.log(formData);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sport-categories/update`,
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
      window.location.reload();
      setTimeout(() => {
        setIsOpen(false);
        setFormData({
          name: "",
        });
      }, 2000);
    } catch (error) {
      Swal.fire({
        title: error,
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
