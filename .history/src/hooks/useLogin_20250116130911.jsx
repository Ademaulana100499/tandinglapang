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
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (resp.ok) {
        setCookie("token", resp.data.token);
        router.push("/");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error: ", error);
      alert("An error occurred");
    }
  };

  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
