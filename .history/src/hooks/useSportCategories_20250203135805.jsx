import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

export const useSportCategories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]); // state untuk menyimpan data kategori

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/sport-categories`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      // Menyimpan data kategori dalam state
      setCategories(res.data.result.data);
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

  return { fetchCategories, loading, error, categories }; // return kategori untuk dipakai di komponen lain
};
