// components/SportCategoryDropdown.js
import { useState, useEffect } from "react";
import axios from "axios";

const SportCategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1); // Untuk pagination

  // Mengambil data kategori olahraga
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sport-categories?is_paginate=true&per_page=5&page=${page}`
        );
        setCategories(response.data.result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [page]); // Memanggil API setiap kali halaman berubah

  // Handle perubahan pilihan dropdown
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Handle perubahan halaman (pagination)
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <select value={selectedCategory} onChange={handleChange}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <div>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}>
              &laquo; Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={categories.length < 4} // Disable Next jika tidak ada halaman berikutnya
            >
              Next &raquo;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SportCategoryDropdown;
