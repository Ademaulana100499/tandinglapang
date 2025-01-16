import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { handleLogin } from "@/services/auth";
import { useState } from "react";
import Swal from "sweetalert2";

const useLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormLogin = async () => {
    try {
      // Panggil fungsi login dan ambil responsenya
      const response = await handleLogin(formData);
      console.log(response);

      // Ambil token dari response
      const token = response?.data?.data?.token;
      if (!token) {
        throw new Error("Token is not defined in the response");
      }

      // Simpan token di cookie
      setCookie("token", token);

      // Kirim token ke server (opsional)
      await fetch("/api/store-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }), // Gunakan token yang sudah didefinisikan
      });

      // Tampilkan notifikasi sukses
      Swal.fire({
        title: response.data.message,
        icon: "success",
        draggable: true,
      });

      // Redirect ke halaman lain
      router.push("/");
    } catch (error) {
      // Tangani error
      console.error(error);
      Swal.fire({
        title: "Email or Password is incorrect!",
        icon: "error",
        draggable: true,
      });
    }
  };

  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
