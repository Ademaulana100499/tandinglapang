import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

export const useLogout = () => {
  const router = useRouter();

  const handleButtonLogout = async () => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/authentication/ssrlogout",
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Logout successful:", res);
      Swal.fire({
        title: res.data.message,
        icon: "success",
        draggable: true,
      });
      deleteCookie("token");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      Swal.fire({
        title: error,
        icon: "error",
        draggable: true,
      });
    }
  };
  return { handleButtonLogout };
};
