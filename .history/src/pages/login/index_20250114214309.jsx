import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import Swal from "sweetalert2";
import { handleLogin } from "../../services/auth";

const LoginPage = () => {
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
        title: "Login Successful!",
        icon: "success",
        confirmButtonColor: "#F97316",
      });

      router.push("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Login Failed!",
        text: error.response?.data?.message || "An error occurred.",
        icon: "error",
        confirmButtonColor: "#F97316",
      });
    }
  };

  if (!isClient) return null;

  return (
    <div>
      <input
        type="text"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
      />
      <button onClick={handleFormLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
