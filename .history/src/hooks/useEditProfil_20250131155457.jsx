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
  const id = userId;

  const handleFormEditProfil = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.name.length < 3) {
      Swal.fire({
        title: "Nama minimal 3 karakter!",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    } else if (formData.name.length > 50) {
      Swal.fire({
        title: "Nama maksimal 50 karakter!",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    } else if (!formData.email) {
      Swal.fire({
        title: "Email tidak boleh Kosong!",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Swal.fire({
        title: "Format email tidak valid!",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    } else if (formData.password !== formData.c_password) {
      Swal.fire({
        title: "Password dan Konfirmasi Password tidak sama!",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    }
    console.log("data yang di kirim", formData);
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
      }, 2000);
      router.push("/profile");
    } catch (error) {
      console.log(error);
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
