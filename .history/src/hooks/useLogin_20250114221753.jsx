import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { handleLogin } from "../../services/auth";


const useLogin = () => {
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
  return handleFormLogin, setFormData, formData;
};

export default useLogin;
