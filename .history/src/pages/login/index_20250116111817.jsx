import React from "react";
import useLogin from "@/hooks/useLogin";
import Link from "next/link";
const LoginPage = () => {
  const { formData, setFormData, handleFormLogin } = useLogin();
  const callAuthenticationAPI = async () => {
    fetch("/api/authentication")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    callAuthenticationAPI();
  }, []);

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
      <Link href="/register">Register</Link>
    </div>
  );
};

export default LoginPage;
