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
