import { useState, useEffect } from "react";

const SearchComboBox = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fungsi untuk fetch data provinsi
  const fetchProvinces = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/location/provinces?is_paginate=true&per_page=5&page=1`
      );
      const data = await res.json();
      // Pastikan data.result.data adalah array
      if (Array.isArray(data.result.data)) {
        setProvinces(data.result.data); // Set data provinsi
      } else {
        setProvinces([]); // Jika tidak valid, set ke array kosong
      }
    } catch (error) {
      console.error("Error fetching provinces:", error);
      setProvinces([]); // Jika ada error, set ke array kosong
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk fetch semua kota tanpa filter
  const fetchCities = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/location/cities?is_paginate=true&per_page=5&page=1`
      );
      const data = await res.json();
      // Pastikan data.result.data adalah array
      if (Array.isArray(data.result.data)) {
        setCities(data.result.data); // Set data kota
      } else {
        setCities([]); // Jika tidak valid, set ke array kosong
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]); // Jika ada error, set ke array kosong
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk fetch kota berdasarkan ID provinsi yang dipilih
  const fetchCitiesByProvinceId = async (provinceId) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/location/cities/${provinceId}?is_paginate=false&per_page=5&page=1`
      );
      const data = await res.json();
      // Pastikan data.result.data adalah array
      if (Array.isArray(data.result.data)) {
        setCities(data.result.data); // Set data kota
      } else {
        setCities([]); // Jika tidak valid, set ke array kosong
      }
    } catch (error) {
      console.error("Error fetching cities by province id:", error);
      setCities([]); // Jika ada error, set ke array kosong
    } finally {
      setLoading(false);
    }
  };

  // Effect untuk fetch provinsi pada saat pertama kali render
  useEffect(() => {
    fetchProvinces();
    fetchCities(); // Mengambil data kota tanpa filter
  }, []);

  // Handle perubahan pada dropdown provinsi
  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);

    if (provinceId) {
      // Jika provinsi dipilih, fetch kota berdasarkan ID provinsi
      fetchCitiesByProvinceId(provinceId);
    } else {
      // Jika tidak ada provinsi yang dipilih, fetch semua kota
      fetchCities();
    }
  };

  // Filter provinsi berdasarkan search term
  const filteredProvinces = provinces.filter((province) =>
    province.province_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter kota berdasarkan search term
  const filteredCities = cities.filter((city) =>
    city.city_name_full.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-combo-box">
      <div>
        <label htmlFor="province">Select Province:</label>
        <input
          type="text"
          placeholder="Search Province"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          id="province"
          value={selectedProvince || ""}
          onChange={handleProvinceChange}
          className="combo-box">
          <option value="">-- Select Province --</option>
          {filteredProvinces.map((province) => (
            <option key={province.province_id} value={province.province_id}>
              {province.province_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="city">Select City:</label>
        <select id="city" className="combo-box" disabled={!selectedProvince}>
          <option value="">-- Select City --</option>
          {filteredCities.map((city) => (
            <option key={city.city_id} value={city.city_id}>
              {city.city_name_full}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default SearchComboBox;
