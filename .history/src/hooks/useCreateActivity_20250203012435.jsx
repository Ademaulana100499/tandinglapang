import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/router";

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

  const validateForm = () => {
    if (!formData.email || !formData.name) {
      return "Data Masih Kosong!";
    }
    if (formData.name.length < 3) {
      return "Nama minimal 3 karakter!";
    }
    if (formData.name.length > 50) {
      return "Nama maksimal 50 karakter!";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Format email tidak valid!";
    }
    if (!formData.password) {
      return "Password tidak boleh Kosong!";
    }
    if (formData.password.length < 8) {
      return "Password minimal 8 karakter!";
    }
    if (formData.password !== formData.c_password) {
      return "Password dan Konfirmasi Password tidak sama!";
    }
    return null;
  };

  const handleFormRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const validationError = validateForm();
    if (validationError) {
      Swal.fire({
        title: validationError,
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
        setFormData({
          email: "",
          name: "",
          password: "",
          c_password: "",
          role: "",
        });
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
