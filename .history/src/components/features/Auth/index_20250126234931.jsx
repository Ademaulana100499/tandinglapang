import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoginModal } from "@/components/LoginModal";

const Authorization = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State untuk buka/tutup modal login

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookie("token");

      if (!token) {
        setIsLoginModalOpen(true); // Buka modal login jika token tidak ada
      } else {
        setIsAuthenticated(true); // Set authenticated jika ada token
      }
    }
  }, []);

  const closeModal = () => {
    setIsLoginModalOpen(false); // Tutup modal login
  };

  if (isLoginModalOpen) {
    return <LoginModal isOpen={isLoginModalOpen} setIsOpen={closeModal} />;
  }

  return <>{children}</>; // Jika sudah terautentikasi, tampilkan konten utama
};

export default Authorization;
