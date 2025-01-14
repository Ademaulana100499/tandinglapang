import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
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

      router.push("/");
    } catch (error) {
      console.error(error);
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
