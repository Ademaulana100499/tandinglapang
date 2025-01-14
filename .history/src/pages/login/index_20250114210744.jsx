import React from "react";
import { handleLogin } from "../../services/auth";
import useRouter from "next/router";
import { setCookie } from "cookies-next";
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

  return (
    <div>
      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
    </div>
  );
};
export default LoginPage;
