import { useState, useEffect } from "react";
import axios from "axios";

export const useSportCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      let currentPage = 1;
      let allCategories = [];

      try {
        // Loop untuk mendapatkan semua halaman
        while (true) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/sport-categories?page=${currentPage}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("token")}`,
              },
            }
          );

          // Menambahkan kategori dari halaman ini ke daftar kategori keseluruhan
          allCategories = [...allCategories, ...response.data.result.data];

          // Cek apakah ada halaman berikutnya
          if (response.data.result.next_page_url) {
            currentPage++;
          } else {
            break;
          }
        }

        setCategories(allCategories); // Set semua kategori setelah pengambilan selesai
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
