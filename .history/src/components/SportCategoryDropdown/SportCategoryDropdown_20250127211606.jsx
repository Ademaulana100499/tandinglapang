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
    <div className="">
      <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-w-6xl mx-auto overflow-hidden">
        {/* Pagination untuk Provinsi */}
        <div className="flex justify-between items-center mb-4 px-4">
          <button
            onClick={() => handleProvincePageChange(provincePage - 1)}
            disabled={provincePage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            &laquo;
          </button>
          <span className="text-sm">Provinsi {provincePage}</span>
          <button
            onClick={() => handleProvincePageChange(provincePage + 1)}
            disabled={provincePage === totalProvincePages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            &raquo;
          </button>
        </div>

        {/* Dropdown Provinsi */}
        <div className="mb-4 px-4">
          <Select
            value={selectedProvince}
            onChange={handleProvinceChange}
            options={provinces.map((province) => ({
              value: province.province_id,
              label: province.province_name,
            }))}
            placeholder="Pilih Provinsi"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Dropdown Kota jika Provinsi sudah dipilih */}
        {selectedProvince && (
          <div className="mb-4 px-4">
            <Select
              value={selectedCity}
              onChange={handleCityChange}
              options={cities.map((city) => ({
                value: city.city_id,
                label: city.city_name,
              }))}
              placeholder="Pilih Kota"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        {/* Pagination untuk Kategori */}
        <div className="flex justify-between items-center mb-4 px-4">
          <button
            onClick={() => handleCategoryPageChange(categoryPage - 1)}
            disabled={categoryPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            &laquo;
          </button>
          <span className="text-sm">Sport {categoryPage}</span>
          <button
            onClick={() => handleCategoryPageChange(categoryPage + 1)}
            disabled={categories.length < 5}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            &raquo;
          </button>
        </div>

        {/* Dropdown Kategori */}
        <div className="mb-4 px-4">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded">
            <option value="">Pilih kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tombol Cari */}
        <div className="px-4">
          <button
            onClick={handleSearch}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Cari
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationAndSportCategoryDropdown;
