import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useState } from "react";

const useLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormLogin = async () => {
    try {
      const resp = await fetch("/api/authentication/ssrlogin", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      console.log(data);
      setCookie("token", data.data.data.token);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
