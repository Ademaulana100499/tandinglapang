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
      <div className="h-screen flex flex-col justify-center items-center space-y-4">
        <div className="text-center text-xl font-semibold">
          Sepertinya Anda belum login.
        </div>
        <div className="space-x-4">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Login
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            Kembali
          </button>
        </div>
        <LoginModal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
      </div>
    );

  return <>{children}</>;
};

export default Authorization;
