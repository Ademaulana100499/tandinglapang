import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

const useSportCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      setCategories([]);
      setError(null);
    };
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/sport-categories`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      const categoriesFromAPI = response.data.result.data || [];
      const categoryExists = categoriesFromAPI.some(
        (category) => category.id === 1
      );

      if (!categoryExists) {
        categoriesFromAPI.unshift({ id: 1, name: "Sepak Bola" });
      }

      setCategories(categoriesFromAPI);
    } catch (err) {
      setError("Error fetching categories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
  };
};

export default useSportCategories;
