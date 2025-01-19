import { useState, useEffect } from "react";
import axios from "axios";

export const useSportCategory = (page = 1) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sport-categories?is_paginate=true&per_page=5&page=${page}`
        );
        setCategories(response.data.result.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [page]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return {
    categories,
    loading,
    selectedCategory,
    handleCategoryChange,
  };
};
