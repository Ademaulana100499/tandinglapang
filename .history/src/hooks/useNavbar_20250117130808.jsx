import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const useNavbar = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = getCookie("token");
  const router = typeof window !== "undefined" ? useRouter() : null;
  const hiddenPages = ["/profile", "/login", "/register"];
  const isHidden = router ? hiddenPages.includes(router.pathname) : false;
  useEffect(() => {
    const getData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [token]);

  return { data, loading, token, isHidden };
};

export default useNavbar;
