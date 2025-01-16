import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

export const useLogout = () => {
  const router = useRouter();

  const handleButtonLogout = async () => {
    try {
      const res = await axios.get("/api/authentication/ssrlogout", {
        headers: {},
      });
      console.log("Logout successful:", res);
      Swal.fire({
        title: res.data.message,
        icon: "success",
        draggable: true,
      });
      deleteCookie("token");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return { handleButtonLogout };
};
