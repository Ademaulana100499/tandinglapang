import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const LocationDropdown = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null); // Untuk memilih provinsi atau kota
  const [provincePage, setProvincePage] = useState(1);
  const [totalProvincePages, setTotalProvincePages] = useState(1);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/location/provinces?is_paginate=true&per_page=5&page=${provincePage}`
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

  useEffect(() => {
    if (selectedOption && selectedOption.type === "province") {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/location/cities/${selectedOption.value}`
          );
          setCities(response.data.result.data); // Mengambil semua kota tanpa paginasi
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };

      fetchCities();
    }
  }, [selectedOption]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  // Gabungkan provinsi dan kota menjadi satu list
  const provinceOptions = provinces.map((province) => ({
    value: province.province_id,
    label: province.province_name,
    type: "province", // Tanda bahwa ini adalah provinsi
  }));

  const cityOptions = cities.map((city) => ({
    value: city.city_id,
    label: city.city_name,
    type: "city", // Tanda bahwa ini adalah kota
  }));

  const combinedOptions = [...provinceOptions, ...cityOptions];

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            options={combinedOptions}
            placeholder="Pilih Provinsi atau Kota"
            getOptionLabel={(e) => e.label}
            getOptionValue={(e) => e.value}
            isSearchable={true}
          />
          {selectedOption && selectedOption.type === "province" && (
            <p>Provinsi yang dipilih: {selectedOption.label}</p>
          )}
          {selectedOption && selectedOption.type === "city" && (
            <p>Kota yang dipilih: {selectedOption.label}</p>
          )}
        </div>
      )}

      {/* Paginasi provinsi */}
      <div>
        <button
          onClick={() => setProvincePage(provincePage - 1)}
          disabled={provincePage === 1}>
          &laquo; Previous
        </button>
        <span>
          Page {provincePage} of {totalProvincePages}
        </span>
        <button
          onClick={() => setProvincePage(provincePage + 1)}
          disabled={provincePage === totalProvincePages}>
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default LocationDropdown;
