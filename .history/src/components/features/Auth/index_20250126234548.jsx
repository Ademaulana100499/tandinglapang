import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { LoginModal } from "@/components/LoginModal";

const Authorization = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State untuk modal login

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookie("token");

      if (!token) {
        setIsLoginModalOpen(true); // Buka modal login
      } else {
        setIsAuthenticated(true); // Jika ada token, set authenticated
      }
    }
  }, []);

  const closeModal = () => {
    setIsLoginModalOpen(false); // Tutup modal login
  };

  if (!isAuthenticated && isLoginModalOpen) {
    return <LoginModal isOpen={isLoginModalOpen} setIsOpen={closeModal} />;
  }

  return <>{children}</>;
};

export default Authorization;
