import { useState, useEffect } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  // URL API
  const BASE_URL = "https://example.com"; // Ganti dengan BASE_URL yang sebenarnya

  // Fungsi untuk fetch data provinsi
  const fetchProvinces = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/location/provinces?is_paginate=true&per_page=5&page=1`
      );
      const data = await res.json();
      setProvinces(data.result);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk fetch data kota berdasarkan input
  const fetchCities = async (provinceId) => {
    setLoading(true);
    try {
      const res = await fetch(
        // `${BASE_URL}/api/v1/location/cities?is_paginate=true&per_page=5&page=1`
        `${process.env.NEXT_PUBLIC_API_URL}/location/cities/${provinceId}?is_paginate=false&per_page=5&page=1`
      );
      const data = await res.json();
      setCities(data.result);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk fetch kota berdasarkan ID provinsi
  const fetchCitiesById = async (provinceId) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/location/cities/${provinceId}?is_paginate=false&per_page=5&page=1`
      );
      const data = await res.json();
      setCities(data.result);
    } catch (error) {
      console.error("Error fetching cities by ID:", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect untuk fetch provinsi pada saat pertama kali render
  useEffect(() => {
    fetchProvinces();
  }, []);

  // Handle perubahan input search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter kota berdasarkan search term
  const filteredCities = cities.filter((city) =>
    city.city_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a city"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      {loading && <p>Loading...</p>}

      <div>
        <h2>Provinces</h2>
        <ul>
          {provinces.map((province) => (
            <li
              key={province.city_id}
              onClick={() => fetchCitiesById(province.city_id)}>
              {province.city_name_full}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Cities</h2>
        <ul>
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <li key={city.city_id}>{city.city_name_full}</li>
            ))
          ) : (
            <p>No cities found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Search;
