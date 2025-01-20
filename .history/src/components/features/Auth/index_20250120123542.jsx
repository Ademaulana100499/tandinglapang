import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Authorization = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookie("token");
      if (!token && router.pathname !== "/login") {
        router.push("/login");
      }
    }
  }, [router]);

  return <>{children}</>;
};

export default Authorization;
