import React from "react";
import useLogin from "@/hooks/useLogin";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
const LoginPage = () => {
  const { formData, setFormData, handleFormLogin } = useLogin();

  return (
    <div>
      <Navbar />

      <div className="bg-gray-96 h-screen">
        <input
          type="text"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Password"
        />
        <button onClick={handleFormLogin}>Login</button>
        <Link href="/register">Register</Link>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
