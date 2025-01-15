import { handleLogout } from "@/services/auth";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

export const useLogout = () => {
  const router = useRouter();

  const handleButtonLogout = async () => {
    try {
      const response = await handleLogout();
      console.log("Logout successful:", response);
      deleteCookie("token");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return { handleButtonLogout };
};
