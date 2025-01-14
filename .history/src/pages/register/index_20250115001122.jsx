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
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Name"
      />
      <input
        type="password"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Password"
      />
      <input
        type="password"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Confirm Password"
      />
      <input
        type="number"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Phone Number"
      />
      <button onClick={handleFormRegister}>Register</button>
      <Link href="/login">Login</Link>
    </div>
  );
};
export default RegisterPage;
