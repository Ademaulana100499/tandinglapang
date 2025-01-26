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
        router.push("/"); // Arahkan ke halaman home
        setIsLoginModalOpen(true); // Buka modal login setelah diarahkan
      } else {
        setIsAuthenticated(true); // Jika ada token, berarti user sudah terautentikasi
      }
    }
  }, [router]);

  const closeModal = () => {
    setIsLoginModalOpen(false); // Tutup modal login
  };

  if (!isAuthenticated && isLoginModalOpen) {
    return <LoginModal isOpen={isLoginModalOpen} setIsOpen={closeModal} />;
  }

  return <>{children}</>;
};

export default Authorization;
