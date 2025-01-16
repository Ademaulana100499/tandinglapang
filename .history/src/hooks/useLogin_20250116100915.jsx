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
      const data = await handleLoginSSR(formData);
      setCookie("token", data.data.data.token);
      Swal.fire({
        title: data.message || "Login successful!",
        icon: "success",
        draggable: true,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: error.message || "Email or Password is incorrect!",
        icon: "error",
        draggable: true,
      });
    }
  };

  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
