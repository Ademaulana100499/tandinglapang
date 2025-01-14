import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { handleLogin } from "../../services/auth";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const useLogin = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFormLogin = async () => {
    try {
      const response = await handleLogin(formData);
      console.log(response);
      setCookie("token", response.data.token);
      Swal.fire({
        title: "Login Success!",
        icon: "success",
        draggable: true,
        confirmButtonColor: "#F97316",
      });
      router.push("/");
    } catch (error) {
      console.error(error.data.message);
      Swal.fire({
        title: "Email or Password is incorrect!",
        icon: "error",
        draggable: true,
        confirmButtonColor: "#F97316",
      });
    }
  };

  if (!isClient) return null;
  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
