import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

export const useSportCategories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  console.log(categories);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    let allCategories = [];

    const token = getCookie("token");
    if (!token) {
      setLoading(false);
      setError("No token found. Please log in.");
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "No token found. Please log in.",
      });
      return;
    }

    try {
      let currentPage = 1;
      let totalPages = 1;

      while (currentPage <= totalPages) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sport-categories?page=${currentPage}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.result && res.data.result.data) {
          allCategories = [...allCategories, ...res.data.result.data];
          totalPages = res.data.result.last_page;
        } else {
          throw new Error("Invalid data format received from API.");
        }

        currentPage++;
      }

      setCategories(allCategories);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
      setError("Something went wrong. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch categories!",
      });
    }
  };

  return { fetchCategories, loading, error, categories };
};
