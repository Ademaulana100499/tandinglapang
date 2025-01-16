import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useState } from "react";
import axios from "axios";
const useLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleFormLogin = async () => {
    if (!formData.email || !formData.password) {
      console.error("Email or password cannot be empty");
      return;
    }

    try {
      const res = await axios.post("/api/authentication/ssrlogin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data && res.data.data && res.data.data.token) {
        setCookie("token", res.data.data.token);
        router.push("/");
      } else {
        console.error("Token not found in response");
      }
    } catch (error) {
      alert(error, "error goblok");
    }
  };

  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
