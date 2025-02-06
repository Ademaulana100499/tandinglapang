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
  const pathname = usePathname();
  const router = useRouter();
  const role = getCookie("role");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const token = getCookie("token");
        if (!token) {
          router.replace("/unauthorized");
          return;
        }
        if (!accessRoles.guest.includes(pathname)) {
          if (!role || !accessRoles[role]?.includes(pathname)) {
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
