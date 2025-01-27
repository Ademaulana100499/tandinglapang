import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useRouter } from "next/router";

const LocationAndSportCategoryDropdown = () => {
  const router = useRouter();
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [provincePage, setProvincePage] = useState(1);
  const [totalProvincePages, setTotalProvincePages] = useState(1);
  const [categoryPage, setCategoryPage] = useState(1);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/location/provinces?is_paginate=true&per_page=5&page=${provincePage}`
        );
        setProvinces(response.data.result.data);
        setTotalProvincePages(response.data.result.last_page);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, [provincePage]);

  useEffect(() => {
    if (!selectedProvince) return;

    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/location/cities/${selectedProvince.value}`
        );
        setCities(response.data.result.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, [selectedProvince]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sport-categories?is_paginate=true&per_page=5&page=${categoryPage}`
        );
        setCategories(response.data.result.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [categoryPage]);

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    setSelectedCity(null);
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleProvincePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalProvincePages) {
      setProvincePage(newPage);
    }
  };

  const handleCategoryPageChange = (newPage) => {
    setCategoryPage(newPage);
  };

  const handleSearch = () => {
    const query = {
      sport_category_id: selectedCategory || "",
      city_id: selectedCity ? selectedCity.value : "",
    };

    router.push({
      pathname: "/explore",
      query,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-5">
      {/* Pagination Provinsi */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          onClick={() => handleProvincePageChange(provincePage - 1)}
          disabled={provincePage === 1}>
          &laquo;
        </button>
        <span className="text-lg font-semibold">Provinsi {provincePage}</span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          onClick={() => handleProvincePageChange(provincePage + 1)}
          disabled={provincePage === totalProvincePages}>
          &raquo;
        </button>
      </div>

      {/* Pilih Provinsi */}
      <div className="mb-6">
        <Select
          value={selectedProvince}
          onChange={handleProvinceChange}
          options={provinces.map((province) => ({
            value: province.province_id,
            label: province.province_name,
          }))}
          placeholder="Pilih Provinsi"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {selectedProvince && (
        <div className="mb-6">
          <Select
            value={selectedCity}
            onChange={handleCityChange}
            options={cities.map((city) => ({
              value: city.city_id,
              label: city.city_name,
            }))}
            placeholder="Pilih Kota"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
      )}

      {/* Pagination Kategori */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          onClick={() => handleCategoryPageChange(categoryPage - 1)}
          disabled={categoryPage === 1}>
          &laquo;
        </button>
        <span className="text-lg font-semibold">Sport {categoryPage}</span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          onClick={() => handleCategoryPageChange(categoryPage + 1)}
          disabled={categories.length < 5}>
          &raquo;
        </button>
      </div>

      {/* Pilih Kategori */}
      <div className="mb-6">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-lg">
          <option value="">Pilih kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tombol Cari */}
      <div className="text-center">
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Cari
        </button>
      </div>
    </div>
  );
};

export default LocationAndSportCategoryDropdown;
