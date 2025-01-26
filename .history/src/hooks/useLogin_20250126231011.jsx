import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useLogin = (setIsOpen) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    return () => {
      setFormData({ email: "", password: "" });
    };
  }, []);
  const handleFormLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.email && !formData.password) {
      Swal.fire({
        title: "Email & Password tidak boleh Kosong!",
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
    } else if (!formData.email) {
      Swal.fire({
        title: "Email  tidak boleh Kosong!",
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
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
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
        confirmButtonColor: "#31c360",
      });
      setFormData({ email: "", password: "" });
      setCookie("token", res.data.data.token);
      setIsOpen(false);
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
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFormLogin, setFormData, formData, isLoading };
};

export default useLogin;
