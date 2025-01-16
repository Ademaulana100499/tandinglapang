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
  const handleFormLogin = async () => {
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
      const errorMessage = error.response?.data?.message || "Login failed";
      const validationErrors = error.response?.data?.error?.data;

      Swal.fire({
        title: "Login Error",
        text: errorText,
        icon: "error",
        draggable: true,
      });
    }
  };

  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
