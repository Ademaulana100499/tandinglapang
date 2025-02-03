import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const useEditProfil = (setIsOpen, userId) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    c_password: "",
    phone_number: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (formData.name.length < 3) {
      return "Nama minimal 3 karakter!";
    } else if (formData.name.length > 50) {
      return "Nama maksimal 50 karakter!";
    } else if (!formData.email) {
      return "Email tidak boleh kosong!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Format email tidak valid!";
    } else if (formData.password !== formData.c_password) {
      return "Password dan Konfirmasi Password tidak sama!";
    }
    return null;
  };

  const handleFormEditProfil = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const errorMessage = validateForm();
    if (errorMessage) {
      Swal.fire({
        title: errorMessage,
        icon: "error",
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/update-user/${userId}`,
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
        confirmButtonColor: "#31c360",
      });

      setTimeout(() => {
        setIsOpen(false);
        setFormData({
          email: "",
          name: "",
          password: "",
          c_password: "",
          phone_number: "",
        });
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Terjadi kesalahan saat mengubah profil!",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFormEditProfil, setFormData, formData, isLoading };
};

export default useEditProfil;
