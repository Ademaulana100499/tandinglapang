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

      if (!token) {
        // Jika tidak ada token dan halaman saat ini adalah "/",
        // buka modal login
        if (router.pathname === "/") {
          setIsLoginModalOpen(true);
        } else {
          router.push("/"); // Arahkan ke halaman utama jika belum login
        }
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  const closeModal = () => {
    setIsLoginModalOpen(false); // Tutup modal login
  };

  if (isAuthenticated === null) {
    return <LoginModal isOpen={isLoginModalOpen} setIsOpen={closeModal} />;
  }

  return <>{children}</>;
};

export default Authorization;
