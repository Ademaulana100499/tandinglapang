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
      const response = await handleLogin(formData);
      console.log(response);
      setCookie("token", response.data.token);
      Swal.fire({
        title: response.message,
        icon: "success",
        draggable: true,
        confirmButtonColor: "#F97316",
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Email or Password is incorrect!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#F97316",
      });
    }
  };

  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
