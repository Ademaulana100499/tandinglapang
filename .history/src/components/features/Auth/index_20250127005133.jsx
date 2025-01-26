import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoginModal } from "@/components/LoginModal";
import { FaSadTear } from "react-icons/fa";
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
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-300 to-green-600 p-8 rounded-lg shadow-xl">
        <div className="text-center text-3xl font-semibold text-white mb-6 flex flex-col items-center">
          <FaSadTear className="text-5xl  mb-4" /> {/* Ikon Sad Tear */}
          Sepertinya Anda belum login
        </div>
        <div className="space-y-4">
          <p className="text-lg text-white opacity-80">
            Untuk melanjutkan, silakan login terlebih dahulu.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-6 py-3 bg-yellow-500 text-white text-lg rounded-lg shadow-lg hover:bg-yellow-600 transition duration-200">
              Login
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-gray-700 text-white text-lg rounded-lg shadow-lg hover:bg-gray-800 transition duration-200">
              Kembali ke Beranda
            </button>
          </div>
        </div>
        <LoginModal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
      </div>
    );

  return <>{children}</>;
};

export default Authorization;
