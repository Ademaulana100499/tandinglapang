import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useLogin = (setIsOpen) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormLogin = async (e) => {
    e.preventDefault();
    if (!formData.email && !formData.password) {
      Swal.fire({
        title: "Email & Password tidak boleh Kosong!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      return;
    } else if (!formData.password) {
      Swal.fire({
        title: "Password tidak boleh Kosong!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      return;
    } else if (!formData.email) {
      Swal.fire({
        title: "Email  tidak boleh Kosong!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      return;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Swal.fire({
        title: "Format email tidak valid!",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
      return;
    } else {
      setIsOpen(false);
    }

    try {
      const res = await axios.post("/api/authentication/ssrlogin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      Swal.fire({
        title: res.data.message,
        icon: "success",
        draggable: true,
        confirmButtonColor: "#31c360",
      });

      setCookie("token", res.data.data.token);

      router.push("/");
    } catch (error) {
      if (error.response) {
        Swal.fire({
          title: "Email atau Password Salah",
          icon: "error",
          draggable: true,
          confirmButtonColor: "#31c360",
        });
      } else {
        Swal.fire({
          title: "Terjadi kesalahan. Coba lagi nanti.",
          icon: "error",
          draggable: true,
          confirmButtonColor: "#31c360",
        });
      }
    }
  };

  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
