import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useState } from "react";

const useLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleFormLogin = async () => {
    try {
      const resp = await fetch("/api/authentication/server-side-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const { data } = await resp.json();
      if (resp.ok) setCookie("token", data.data.token) && router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
