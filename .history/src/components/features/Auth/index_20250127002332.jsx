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

      // Debugging - lihat apakah token terbaca
      console.log("Token: ", token);

      // Periksa apakah halaman adalah "/" dan token tidak ada
      if (!token && router.pathname === "/") {
        setIsLoginModalOpen(true); // Buka modal jika halaman utama dan token tidak ada
      } else if (!token) {
        // Jika tidak ada token, arahkan ke halaman utama
        router.push("/");
      } else {
        // Jika ada token, set status authenticated ke true
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  const closeModal = () => {
    setIsLoginModalOpen(false); // Tutup modal
  };

  // Jika status autentikasi masih dalam proses, tampilkan modal
  if (isAuthenticated === null) {
    return <LoginModal isOpen={isLoginModalOpen} setIsOpen={closeModal} />;
  }

  return <>{children}</>;
};

export default Authorization;
