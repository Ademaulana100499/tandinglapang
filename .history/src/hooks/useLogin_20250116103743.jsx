import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { handleLoginSSR } from "@/services/auth";
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
      const data = await response.json();

      if (response.ok) {
        res.status(200).json({ message: "Login successful", data: data });
      } else {
        res.status(401).json({ message: "Login failed", data: data });
      }
    }
  };

  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
