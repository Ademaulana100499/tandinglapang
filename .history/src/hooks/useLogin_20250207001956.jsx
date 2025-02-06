import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRole } from "@/context/RoleContext";
const useLogin = (setIsOpen) => {
  const router = useRouter();
  const { setRole, setRoleId } = useRole();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    return () => {
      setFormData({ email: "", password: "" });
    };
  }, []);

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return "Email & Password tidak boleh kosong!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Format email tidak valid!";
    }
    return null;
  };

  const handleFormLogin = async (e) => {
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
      const res = await axios.post("/api/authentication/ssrlogin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      Swal.fire({
        title: res.data.message,
        icon: "success",
        confirmButtonColor: "#31c360",
      });

      setFormData({ email: "", password: "" });
      setCookie("token", res.data.data.token);
      setIsOpen(false);
      const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${res.data.data.token}`,
        },
      });
      const userData = await userRes.json();

      if (userData.data) {
        setRole(userData.data.role);
        setRoleId(userData.data.id);

        if (userData.data.role === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      const errorMessage = error.response
        ? "Email atau Password Salah"
        : "Terjadi kesalahan. Coba lagi nanti.";
      Swal.fire({
        title: errorMessage,
        icon: "error",
        confirmButtonColor: "#31c360",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleFormLogin,
    setFormData,
    formData,
    isLoading,
  };
};

export default useLogin;
