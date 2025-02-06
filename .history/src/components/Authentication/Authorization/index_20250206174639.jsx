import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarLoader } from "@/components/Features/Loading";
import { usePathname } from "next/navigation";

const adminAccess = ["/dashboard", "/explore", "/profile"];
const penyelenggaraAccess = ["/explore", "/profile", "/my-transaction"];
const userAccess = ["/explore", "/profile", "/my-transaction"];
const guestAccess = ["/", "/unauthorized"];
const Authorization = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const role = getCookie("role");
  console.log(pathname);
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const token = getCookie("token");

        if (!token) {
          router.push("/unauthorized");
        } else {
          setIsAuthenticated(true);
          if (!guestAccess.includes(pathname)) {
            if (role === "admin") {
              if (!adminAccess.includes(pathname)) {
                router.push("/unauthorized");
              }
            }
            if (role === "penyelenggara") {
              if (!penyelenggaraAccess.includes(pathname)) {
                router.push("/unauthorized");
              }
            }
            if (role === "user") {
              if (!userAccess.includes(pathname)) {
                router.push("/unauthorized");
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        router.push("/unauthorized");
      }
    }
  }, [router]);

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
