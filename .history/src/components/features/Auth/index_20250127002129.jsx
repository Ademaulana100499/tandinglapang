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

      console.log("Token:", token); // Debugging token

      if (!token) {
        if (router.pathname === "/") {
          setIsLoginModalOpen(true); // Show modal if we're on the homepage
        } else {
          router.push("/"); // Redirect to homepage if not logged in
        }
      } else {
        setIsAuthenticated(true); // Set authentication status if token exists
      }
    }
  }, [router]);

  const closeModal = () => {
    setIsLoginModalOpen(false); // Close the modal
  };

  // Check if authentication is still being processed
  if (isAuthenticated === null) {
    return <LoginModal isOpen={isLoginModalOpen} setIsOpen={closeModal} />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default Authorization;
