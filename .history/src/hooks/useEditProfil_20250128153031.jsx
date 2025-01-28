import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const useEditProfil = (setIsOpen) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    c_password: "",
    role: "",
    phone_number: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleFormEditProfil = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.email && !formData.password && !formData.name) {
      Swal.fire({
        title: "Data Masih Kosong!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    } else if (formData.name.length < 3) {
      Swal.fire({
        title: "Nama minimal 3 karakter!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    } else if (formData.name.length > 50) {
      Swal.fire({
        title: "Nama maksimal 50 karakter!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    } else if (!formData.email) {
      Swal.fire({
        title: "Email tidak boleh Kosong!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Swal.fire({
        title: "Format email tidak valid!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    } else if (!formData.password) {
      Swal.fire({
        title: "Password tidak boleh Kosong!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    } else if (formData.password.length < 8) {
      Swal.fire({
        title: "Password minimal 8 karakter!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    } else if (formData.password !== formData.c_password) {
      Swal.fire({
        title: "Password dan Konfirmasi Password tidak sama!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/update-user/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      Swal.fire({
        title: "Profil Berhasil Diubah!",
        icon: "success",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      setTimeout(() => {
        setIsOpen(false);
        formData.email = "";
        formData.name = "";
        formData.password = "";
        formData.c_password = "";
        formData.phone_number = "";
      }, 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Edit Profil failed";
      const validationErrors = error.response?.data?.error?.data;

      let errorText = errorMessage;
      if (validationErrors) {
        errorText += `\n\n${Object.entries(validationErrors)
          .map(([key, messages]) => `${key}: ${messages.join(", ")}`)
          .join("\n")}`;
      }
      Swal.fire({
        title: errorText,
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFormEditProfil, setFormData, formData, isLoading };
};

export default useEditProfil;
