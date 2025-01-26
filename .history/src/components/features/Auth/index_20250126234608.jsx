import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { LoginModal } from "@/components/LoginModal";

const Authorization = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookie("token");

      if (!token) {
        setIsLoginModalOpen(true);
      } else {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const closeModal = () => {
    setIsLoginModalOpen(false);
  };

  if (!isAuthenticated && isLoginModalOpen) {
    return <LoginModal isOpen={isLoginModalOpen} setIsOpen={closeModal} />;
  }

  return <>{children}</>;
};

export default Authorization;
