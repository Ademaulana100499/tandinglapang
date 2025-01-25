import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      Swal.fire({
        title: "Email & Password Kosong!",
        icon: "error",
        draggable: true,
      });
      return;
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
      });

      setCookie("token", res.data.data.token);

      router.push("/");
    } catch (error) {
      if (error.response) {
        Swal.fire({
          title: "Email atau Password Salah",
          icon: "error",
          draggable: true,
          confirmButtonColor: "#34D399",
        });
      } else {
        Swal.fire({
          title: "Terjadi kesalahan. Coba lagi nanti.",
          icon: "error",
          draggable: true,
        });
      }
    }
  };

  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
