// components/LocationDropdown.js
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "js-cookie";

const LocationDropdown = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [provincePage, setProvincePage] = useState(1);
  const [cityPage, setCityPage] = useState(1);
  const [totalProvincePages, setTotalProvincePages] = useState(1);
  const [totalCityPages, setTotalCityPages] = useState(1);

  // Mengambil data provinsi
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/location/provinces?is_paginate=true&per_page=5&page=${provincePage}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );
        setProvinces(response.data.result.data);
        setTotalProvincePages(response.data.result.last_page);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching provinces:", error);
        setLoading(false);
      }
    };

    fetchProvinces();
  }, [provincePage]);

  // Mengambil data kota berdasarkan provinsi yang dipilih
  useEffect(() => {
    if (selectedProvince) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/location/cities?is_paginate=true&per_page=5&page=${cityPage}&province_id=${selectedProvince}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("token")}`,
              },
            }
          );
          setCities(response.data.result.data);
          setTotalCityPages(response.data.result.last_page);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };

      fetchCities();
    }
  }, [selectedProvince, cityPage]);

  // Handle perubahan pilihan provinsi
  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedCity(""); // Reset kota ketika provinsi berubah
  };

  // Handle perubahan pilihan kota
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  // Handle perubahan halaman provinsi
  const handleProvincePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalProvincePages) {
      setProvincePage(newPage);
    }
  };

  // Handle perubahan halaman kota
  const handleCityPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalCityPages) {
      setCityPage(newPage);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Dropdown Provinsi */}
          <div>
            <select value={selectedProvince} onChange={handleProvinceChange}>
              <option value="">Pilih Provinsi</option>
              {provinces.map((province) => (
                <option key={province.province_id} value={province.province_id}>
                  {province.province_name}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown Kota hanya muncul setelah provinsi dipilih */}
          {selectedProvince && (
            <>
              <div>
                <select value={selectedCity} onChange={handleCityChange}>
                  <option value="">Pilih Kota</option>
                  {cities.map((city) => (
                    <option key={city.city_id} value={city.city_id}>
                      {city.city_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pagination untuk Kota */}
              <div>
                <button
                  onClick={() => handleCityPageChange(cityPage - 1)}
                  disabled={cityPage === 1}>
                  &laquo; Previous
                </button>
                <span>
                  Page {cityPage} of {totalCityPages}
                </span>
                <button
                  onClick={() => handleCityPageChange(cityPage + 1)}
                  disabled={cityPage === totalCityPages}>
                  Next &raquo;
                </button>
              </div>
            </>
          )}

          {/* Pagination untuk Provinsi */}
          <div>
            <button
              onClick={() => handleProvincePageChange(provincePage - 1)}
              disabled={provincePage === 1}>
              &laquo; Previous
            </button>
            <span>
              Page {provincePage} of {totalProvincePages}
            </span>
            <button
              onClick={() => handleProvincePageChange(provincePage + 1)}
              disabled={provincePage === totalProvincePages}>
              Next &raquo;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationDropdown;
