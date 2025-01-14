import React from "react";
import useLogin from "@/hooks/useLogin";
const LoginPage = () => {
  const { formData, setFormData, handleFormLogin } = useLogin();

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
