import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

export const useLogout = () => {
  const router = useRouter();

  const handleButtonLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      deleteCookie("token");
      router.push("/");

      Swal.fire({
        title: "Logout Berhasil",
        icon: "success",
        confirmButtonColor: "#31c360",
      });
    } catch (error) {
      console.error("Logout failed:", error);

      Swal.fire({
        title: "Terjadi kesalahan saat logout",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
    }
  };

  return { handleButtonLogout };
};
