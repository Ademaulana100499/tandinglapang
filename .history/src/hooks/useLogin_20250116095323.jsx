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
    // try {
    //   const response = await handleLogin(formData);
    //   console.log(response);
    //   setCookie("token", response.data.data.token);
    //   Swal.fire({
    //     title: response.data.message,
    //     icon: "success",
    //     draggable: true,
    //   });
    //   router.push("/");
    // } catch (error) {
    //   console.error(error);
    //   Swal.fire({
    //     title: "Email or Password is incorrect!",
    //     icon: "error",
    //     draggable: true,
    //   });
    // }
    try {
      const resp = await fetch("/api/authentication/server-side-login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      setCookie("token", data.data.data.token);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
