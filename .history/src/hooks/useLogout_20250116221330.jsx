import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

export const useLogout = () => {
  const router = useRouter();

  const handleButtonLogout = async () => {
    try {
      const res = await axios.post(
        "/api/authentication/ssrlogout",
        {}, // Body kosong
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Jika logout berhasil
      if (res.status === 200) {
        Swal.fire({
          title: res.data.message || "Logout successful",
          icon: "success",
          draggable: true,
        });

        // Hapus cookie token
        deleteCookie("token");

        // Redirect ke halaman login
        router.push("/login");
      } else {
        throw new Error(res.data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);

      Swal.fire({
        title: "Logout failed",
        text: error.response?.data?.message || error.message,
        icon: "error",
        draggable: true,
      });
    }
  };

  return { handleButtonLogout };
};
