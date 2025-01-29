import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
importr { useRouter } from "next/router";
const useRegister = (setIsOpen) => {
   const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    c_password: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleFormRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.email && !formData.password && !formData.name) {
      Swal.fire({
        title: "Data Masih Kosong!",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    } else if (formData.name.length < 3) {
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
    } else if (!formData.password) {
      Swal.fire({
        title: "Password tidak boleh Kosong!",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    } else if (formData.password.length < 8) {
      Swal.fire({
        title: "Password minimal 8 karakter!",
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
    try {
      const res = await axios.post("/api/authentication/ssrregist", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      Swal.fire({
        title: "Registrasi berhasil silahkan masuk!",
        icon: "success",
        confirmButtonColor: "#31c360",
      });
      router.push("/");
      setTimeout(() => {
        setIsOpen(false);
        formData.email = "";
        formData.name = "";
        formData.password = "";
        formData.c_password = "";
      }, 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
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
        confirmButtonColor: "#31c360",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFormRegister, setFormData, formData, isLoading };
};

export default useRegister;
