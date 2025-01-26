import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoginModal } from "@/components/LoginModal";

const Authorization = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
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
  }, [router]);

  const closeModal = () => {
    setIsLoginModalOpen(false);
  };

  if (isAuthenticated === null || isLoginModalOpen) {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          Loading...
        </div>
        <LoginModal isOpen={isLoginModalOpen} setIsOpen={closeModal} />
      </>
    );
  }

  return <>{children}</>;
};

export default Authorization;
