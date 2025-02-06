import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarLoader } from "@/components/Features/Loading";
import { useRole } from "@/context/RoleContext";

const Authorization = ({ children }) => {
  const router = useRouter();
  const { email } = useRole();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const token = getCookie("token");
        const path = router.pathname;

        if (!token) {
          router.push("/unauthorized");
        } else {
          if (path === "/dashboard" && !email.endsWith("@dibimbing.com")) {
            router.push("/unauthorized");
          } else {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        router.push("/unauthorized");
      }
    }
  }, [router, email]);

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
