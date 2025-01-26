import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoginModal } from "@/components/LoginModal";
const Authorization = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookie("token");

      if (!token) {
        setIsLoginOpen(true);
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  if (isAuthenticated === null)
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
        <LoginModal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />;
      </div>
    );

  return <>{children}</>;
};

export default Authorization;
