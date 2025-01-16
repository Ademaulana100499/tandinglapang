import { handleLogout } from "@/pages/api/services/auth";
import { getProfile } from "@/pages/api/services/profile";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const useProfile = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState({});

  const onLogout = async () => {
    try {
      if (!hasCookie("token")) {
        router.push("/login");
        return;
      }
      const token = getCookie("token");
      await handleLogout(token);
      await deleteCookie("token");
      Swal.fire({
        title: "Logout successful",
        icon: "success",
        draggable: true,
      });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      Swal.fire({
        title: "Logout failed. Please try again.",
        icon: "error",
        draggable: true,
      });
    }
  };

  const loadProfile = async () => {
    if (!hasCookie("token")) {
      router.push("/login");
      return;
    }
    const token = getCookie("token");
    try {
      const response = await getProfile(token);
      if (response.status === 200) {
        setProfileData(response.data?.data);
      }
    } catch (error) {
      await Swal.fire({
        title: "Profile failed. Please try again.",
        icon: "error",
        draggable: true,
      });
      router.push("/login");
    }
  };

  useEffect(() => {
    // loadProfile();
  }, []);

  return { onLogout, profileData };
};

export default useProfile;
