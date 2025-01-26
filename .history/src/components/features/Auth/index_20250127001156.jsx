import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoginModal } from "@/components/LoginModal";

const Authorization = ({ children }) => {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookie("token");

      // Cek apakah token ada dan user berada di halaman "/"
      if (!token) {
        if (router.pathname === "/") {
          setIsLoginModalOpen(true); // Buka modal jika di halaman "/"
        }
      } else {
        setIsAuthenticated(true); // Set user sebagai terautentikasi
      }
    }
  }, [router.pathname]);

  // Jika proses pengecekan autentikasi belum selesai
  if (isAuthenticated === null) {
    return <LoginModal isOpen={isLoginModalOpen} />;
  }

  // Jika sudah terautentikasi, tampilkan konten anak
  return <>{children}</>;
};

export default Authorization;
