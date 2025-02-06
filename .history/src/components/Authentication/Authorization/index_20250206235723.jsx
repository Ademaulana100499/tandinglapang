import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarLoader } from "@/components/Features/Loading";
import { usePathname } from "next/navigation";

const accessRoles = {
  admin: ["/dashboard", "/explore", "/profile"],
  organizer: ["/explore", "/profile", "/my-transaction"],
  user: ["/explore", "/profile", "/my-transaction"],
  guest: ["/", "/unauthorized"],
};

const Authorization = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const role = getCookie("role");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const token = getCookie("token");

        if (!token) {
          router.push("/unauthorized");
          return;
        }

        setIsAuthenticated(true);

        if (!accessRoles.guest.includes(pathname)) {
          if (!role || !accessRoles[role]?.includes(pathname)) {
            router.push("/unauthorized");
          }
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        router.push("/unauthorized");
      }
    }
  }, [pathname, role, router]);

  if (isAuthenticated === null) {
    return (
      <div className="h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-green-600">
        <BarLoader />
      </div>
    );
  }

  return <>{children}</>;
};

export default Authorization;
