import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

export const useSportCategories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    let allCategories = []; // Untuk menyimpan semua data kategori

    try {
      let currentPage = 1;
      let totalPages = 1; // Set awal jumlah total halaman

      // Looping untuk mengambil data dari semua halaman
      while (currentPage <= totalPages) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sport-categories?page=${currentPage}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );

        allCategories = [...allCategories, ...res.data.result.data]; // Gabungkan data kategori
        totalPages = res.data.result.last_page; // Update total halaman
        currentPage++; // Pindah ke halaman berikutnya
      }

      setCategories(allCategories); // Set semua kategori setelah mengambil dari semua halaman
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
