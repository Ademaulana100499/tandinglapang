import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const useRegister = (setIsOpen) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    c_password: "",
    role: "user",
  });

  const handleFormRegister = async (e) => {
    e.preventDefault();
    if (!formData.email && !formData.password && !formData.name) {
      Swal.fire({
        title: "Data Masih Kosong!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      return;
    } else if (formData.name.length < 3) {
      Swal.fire({
        title: "Nama minimal 3 karakter!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      return;
    } else if (formData.name.length > 50) {
      Swal.fire({
        title: "Nama maksimal 50 karakter!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      return;
    } else if (!formData.email) {
      Swal.fire({
        title: "Email tidak boleh Kosong!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      return;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Swal.fire({
        title: "Format email tidak valid!",
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
    } else if (formData.password.length < 8) {
      Swal.fire({
        title: "Password minimal 8 karakter!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      return;
    } else if (formData.password !== formData.c_password) {
      Swal.fire({
        title: "Password dan Konfirmasi Password tidak sama!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#31c360",
      });
      return;
    }
    try {
      const res = await axios.post("/api/authentication/ssrregist", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      Swal.fire({
        title: res.data.message,
        icon: "success",
        draggable: true,
      });
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
      router.push("/");
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
        title: "Registration Error",
        text: errorText,
        icon: "error",
        draggable: true,
      });
    }
  };

  return { handleFormRegister, setFormData, formData };
};

export default useRegister;
