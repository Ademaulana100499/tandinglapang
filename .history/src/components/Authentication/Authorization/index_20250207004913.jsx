import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const accessRoles = {
  admin: ["/dashboard", "/explore", "/profile"],
  organizer: ["/explore", "/profile", "/my-transaction"],
  user: ["/explore", "/profile", "/my-transaction"],
  guest: ["/", "/unauthorized"],
};

const Authorization = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const role = getCookie("role");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const token = getCookie("token");

        if (!token) {
          router.replace("/unauthorized");
          return;
        }
        const staticPath = pathname.split("/")[1];

        if (!accessRoles.guest.includes(pathname)) {
          if (!role || !accessRoles[role]?.includes(`/${staticPath}`)) {
            router.replace("/unauthorized");
          }
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        router.replace("/unauthorized");
      }
    }
  }, [pathname, role, router]);

  return <>{children}</>;
};

export default Authorization;
