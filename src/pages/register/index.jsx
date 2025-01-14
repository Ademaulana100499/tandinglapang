import React from "react";
import Link from "next/link";
import useRegister from "@/hooks/useRegister";
const RegisterPage = () => {
  const { formData, setFormData, handleFormRegister } = useRegister();
  return (
    <div>
      <input
        type="text"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
      <input
        type="number"
        value={formData.phone_number}
        onChange={(e) =>
          setFormData({ ...formData, phone_number: e.target.value })
        }
        placeholder="Phone Number"
      />
      <button onClick={handleFormRegister}>Register</button>
      <Link href="/login">Login</Link>
    </div>
  );
};
export default RegisterPage;
