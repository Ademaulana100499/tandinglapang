import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Authorization = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookie("token");

      if (!token) {
        router.push("/");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  if (isAuthenticated === null)
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  return <>{children}</>;
};

export default Authorization;
