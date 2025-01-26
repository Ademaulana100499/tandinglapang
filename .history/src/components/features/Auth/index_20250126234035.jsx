import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginModal from "../LoginModal";

const Authorization = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State untuk modal login

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookie("token");

      if (!token) {
        setIsLoginModalOpen(true); // Buka modal login jika token tidak ada
      } else {
        setIsAuthenticated(true); // Setel sebagai terautentikasi
      }
    }
  }, [router]);

  const closeModal = () => {
    setIsLoginModalOpen(false); // Tutup modal login
  };

  if (isAuthenticated === null || isLoginModalOpen) {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          Loading...
        </div>
        <LoginModal isOpen={isLoginModalOpen} setIsOpen={closeModal} />{" "}
        {/* Modal login */}
      </>
    );
  }

  return <>{children}</>;
};

export default Authorization;
