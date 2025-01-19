import React from "react";
import Link from "next/link";
import useRegister from "@/hooks/useRegister";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
const RegisterPage = () => {
  const { formData, setFormData, handleFormRegister } = useRegister();
  return (
    <div>
      <Navbar />
      <div className="bg-gray-200 h-screen">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="text"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />

        <input
          type="text"
          value={formData.phone_number}
          onChange={(e) =>
            setFormData({ ...formData, phone_number: e.target.value })
          }
          placeholder="Phone Number"
          inputMode="numeric"
          pattern="[0-9]*"
          onInput={(e) =>
            (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
          }
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Password"
        />
        <input
          type="password"
          value={formData.c_password}
          onChange={(e) =>
            setFormData({ ...formData, c_password: e.target.value })
          }
          placeholder="Confirm Password"
        />

        <button onClick={handleFormRegister}>Register</button>
        <Link href="/login">Login</Link>
      </div>
      <Footer />
    </div>
  );
};
export default RegisterPage;
