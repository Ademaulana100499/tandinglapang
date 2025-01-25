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
    e.preventDefault(); // Mencegah reload halaman

    // Validasi email dan password
    if (!formData.email || !formData.password) {
      Swal.fire({
        title: "Email & Password Kosong!",
        icon: "error",
        draggable: true,
      });
      return;
    }

    try {
      // Kirim permintaan login ke API
      const res = await axios.post("/api/authentication/ssrlogin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Jika login berhasil
      Swal.fire({
        title: res.data.message,
        icon: "success",
        draggable: true,
      });

      // Menyimpan token ke cookie
      setCookie("token", res.data.data.token);

      // Redirect ke halaman utama
      router.push("/");
    } catch (error) {
      // Menangani error jika login gagal
      if (error.response) {
        Swal.fire({
          title: error.response.data.message || "Email atau Password Salah",
          icon: "error",
          draggable: true,
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
