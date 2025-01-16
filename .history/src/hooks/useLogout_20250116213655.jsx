import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import axios from "axios";

export const useLogout = () => {
  const router = useRouter();

  const handleButtonLogout = async () => {
    try {
      const res = await axios.post("/api/authentication/ssrlogout");
      console.log("Logout successful:", res);
      deleteCookie("token");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return { handleButtonLogout };
};
