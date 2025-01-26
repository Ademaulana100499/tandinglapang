import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoginModal } from "@/components/LoginModal";
const Authorization = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State untuk modal login

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookie("token");

      if (!token) {
        setIsLoginModalOpen(true); // Buka modal login jika token tidak ada
      } else {
        setIsAuthenticated(true); // Jika ada token, set authenticated
      }
    }
  }, []);

  const closeModal = () => {
    setIsLoginModalOpen(false); // Tutup modal login
  };

  if (!isAuthenticated && isLoginModalOpen) {
    return (
      <>
        {children} {/* Tampilkan halaman yang sedang aktif */}
        <LoginModal isOpen={isLoginModalOpen} setIsOpen={closeModal} />{" "}
        {/* Modal login */}
      </>
    );
  }

  return <>{children}</>; // Jika sudah terautentikasi, tampilkan children (halaman yang aktif)
};

export default Authorization;
