import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

const useNavbar = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = getCookie("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(data.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { data, loading, token };
};

export default useNavbar;
