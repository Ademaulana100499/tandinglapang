// components/ProvinceDropdown.js
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

const ProvinceDropdown = () => {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [page, setPage] = useState(1); // Untuk pagination
  const [totalPages, setTotalPages] = useState(1); // Untuk total halaman

  // Mengambil data provinsi
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/location/provinces?is_paginate=true&per_page=5&page=${page}`
        );
        setProvinces(response.data.result.data);
        setTotalPages(response.data.result.last_page); // Menyimpan total halaman
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
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
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
              &laquo; Previous
            </button>
            <span>
              {" "}
              Page {page} of {totalPages}{" "}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}>
              Next &raquo;
            </button>
          </div>
          <select value={selectedProvince} onChange={handleChange}>
            <option value="">Pilih provinsi</option>
            {provinces.map((province) => (
              <option key={province.province_id} value={province.province_id}>
                {province.province_name}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default ProvinceDropdown;
