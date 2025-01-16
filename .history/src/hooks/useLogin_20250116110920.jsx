import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { handleLoginSSR } from "@/services/auth";
import { useState } from "react";
import Swal from "sweetalert2";
import { fetchAPI } from "@/services/api";

const useLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLoginWithServerSide = async () => {
    try {
      const resp = await handleLoginSSR({
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
