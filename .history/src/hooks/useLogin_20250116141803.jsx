import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useState } from "react";
import axios from "axios";

const useLogin = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
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
      setData(res.data);
      setCookie("token", data.token); // data.data.token, assuming token is inside 'data'
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      // Optional: You can also add a user-friendly error message here.
    }
  };

  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
