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

      // Hanya menampilkan modal jika halaman adalah "/"
      if (!token && router.pathname === "/") {
        setIsLoginModalOpen(true);
      } else if (token) {
        setIsAuthenticated(true);
      } else {
        router.push("/");
      }
    }
  }, [router.pathname]);

  if (isAuthenticated === null) {
    return <LoginModal isOpen={isLoginModalOpen} />;
  }

  return <>{children}</>;
};

export default Authorization;
