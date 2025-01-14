import React from "react";
import { handleLogin } from "../../services/auth";
import useRouter from "next/router";
import { setCookie } from "cookies-next";
const LoginPage = () => {
  return (
    <div>
      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
    </div>
  );
};
export default LoginPage;
