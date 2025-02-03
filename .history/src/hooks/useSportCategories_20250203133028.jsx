import { useState, useEffect } from "react";
import axios from "axios";

export const useSportCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sport-categories`
          {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${getCookie("token")}`,
                    },
                  }
        );
        setCategories(response.data.result.data);
      } catch (err) {
        setError("Error fetching categories");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
