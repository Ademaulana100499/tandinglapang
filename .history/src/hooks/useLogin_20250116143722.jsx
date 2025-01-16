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
    try {
      const res = await axios.post("/api/authentication/ssrlogin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      // Set the cookie with the token from the response
      setCookie("token", res.data.data.token); // Assuming the token is in res.data.token
      router.push("/"); // Redirect to the home page after login
    } catch (error) {
      console.error("Login error:", error);
      // Optional: You can also add a user-friendly error message here.
    }
  };
  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
