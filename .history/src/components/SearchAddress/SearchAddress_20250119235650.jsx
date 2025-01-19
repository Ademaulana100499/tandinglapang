// components/ProvinceDropdown.js
import { useState, useEffect } from "react";
import axios from "axios";

const ProvinceDropdown = () => {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [page, setPage] = useState(1); // Untuk pagination

  // Mengambil data provinsi
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/provinces?is_paginate=true&per_page=5&page=${page}`
        );
        setProvinces(response.data.result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchProvinces();
  }, [page]); // Memanggil API setiap kali halaman berubah

  // Handle perubahan pilihan dropdown
  const handleChange = (event) => {
    setSelectedProvince(event.target.value);
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
          <div>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}>
              &laquo;
            </button>
            <span>Province {page}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={provinces.length < 5} // Disable Next jika tidak ada halaman berikutnya
            >
              &raquo;
            </button>
          </div>
          <select value={selectedProvince} onChange={handleChange}>
            <option value="">Pilih provinsi</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default ProvinceDropdown;
