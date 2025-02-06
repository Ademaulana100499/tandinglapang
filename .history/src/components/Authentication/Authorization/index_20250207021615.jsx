import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarLoader } from "@/components/Features/Loading";
import { useRole } from "@/context/RoleContext"; // Mengimpor context untuk mendapatkan email

const Authorization = ({ children }) => {
  const router = useRouter();
  const { email } = useRole(); // Mengambil email dari context
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const token = getCookie("token");
        const path = router.pathname; // Mendapatkan path saat ini

        // Jika tidak ada token atau email tidak sesuai, redirect ke halaman unauthorized
        if (!token) {
          router.push("/unauthorized");
        } else {
          if (
            path === "/dashboard" &&
            email &&
            !email.endsWith("@dibimbing.com")
          ) {
            // Pastikan email ada dan valid sebelum memeriksa endsWith
            router.push("/unauthorized");
          } else {
            setIsAuthenticated(true); // Jika valid, set autentikasi
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
