import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarLoader } from "@/components/Features/Loading";

const Authorization = ({ children }) => {
  const router = useRouter();
  const email = getCookie("email");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [hasAccess, setHasAccess] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (typeof window !== "undefined") {
        try {
          const token = getCookie("token");
          const path = router.pathname;

          if (!token) {
            router.push("/unauthorized");
          } else {
            if (
              path === "/dashboard" &&
              email &&
              !email.endsWith("@dibimbing.com")
            ) {
              setHasAccess(true);
            } else if (
              (path === "/explore" ||
                path === "/my-transaction" ||
                path === "/") &&
              email &&
              email.endsWith("@dibimbing.com")
            ) {
              setHasAccess(false);
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
    };

    checkAccess();
  }, [router, email]);

  if (isAuthenticated === null || !hasAccess) {
    return (
      <div className="h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-green-600">
        <BarLoader />
      </div>
    );
  }

  return <>{children}</>;
};

export default Authorization;
