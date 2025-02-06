import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarLoader } from "@/components/Features/Loading";
import { useRole } from "@/context/RoleContext"; // Mengambil email dari context

const Authorization = ({ children }) => {
  const router = useRouter();
  const { email } = useRole(); // Mengambil email dari context
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Default null, akan di-set setelah pengecekan
  const [hasAccess, setHasAccess] = useState(true); // Menyimpan status akses

  useEffect(() => {
    const checkAccess = async () => {
      if (typeof window !== "undefined") {
        try {
          const token = getCookie("token");
          const path = router.pathname; // Mendapatkan path saat ini

          // Jika tidak ada token, redirect ke halaman unauthorized
          if (!token) {
            router.push("/unauthorized");
          } else {
            if (
              path === "/dashboard" &&
              email &&
              !email.endsWith("@dibimbing.com")
            ) {
              setHasAccess(false); // Jika email tidak sesuai, set akses ke false
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
    };

    checkAccess();
  }, [router, email]);

  if (isAuthenticated === null || !hasAccess) {
    // Tampilkan loading spinner atau halaman kosong jika belum terautentikasi atau tidak memiliki akses
    return (
      <div className="h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-green-600">
        <BarLoader />
      </div>
    );
  }

  return <>{children}</>;
};

export default Authorization;
