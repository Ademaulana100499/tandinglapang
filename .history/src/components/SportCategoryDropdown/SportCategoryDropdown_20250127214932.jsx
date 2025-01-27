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
  const [categoryPage, setCategoryPage] = useState(1);

  // Mengambil seluruh data provinsi dengan pagination (jika diperlukan)
  useEffect(() => {
    const fetchProvinces = async () => {
      let allProvinces = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/location/provinces?page=${page}`
          );

          const newProvinces = response.data.result.data;
          allProvinces = [...allProvinces, ...newProvinces];

          // Cek apakah masih ada halaman berikutnya
          if (newProvinces.length < response.data.result.per_page) {
            hasMore = false;
          } else {
            page++;
          }
        } catch (error) {
          console.error("Error fetching provinces:", error);
          hasMore = false; // Menghentikan loop jika ada error
        }
      }

      setProvinces(allProvinces);
    };

    fetchProvinces();
  }, []);

  // Mengambil data kota berdasarkan provinsi yang dipilih
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

  // Mengambil kategori olahraga dengan pagination
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
    <div className="w-full mt-1 z-50 max-w-6xl mx-auto">
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
          className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 transition duration-200"
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
              label: city.city_name_full,
            }))}
            placeholder="Pilih Kota"
            className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 transition duration-200"
          />
        </div>
      )}

      {/* Pagination untuk Kategori */}
      <div className="flex justify-between items-center mb-4 px-4">
        <button
          onClick={() => handleCategoryPageChange(categoryPage - 1)}
          disabled={categoryPage === 1}
          className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
          &laquo;
        </button>
        <span className="text-sm font-semibold text-green-700">
          Sport {categoryPage}
        </span>
        <button
          onClick={() => handleCategoryPageChange(categoryPage + 1)}
          disabled={categories.length < 5}
          className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
          &raquo;
        </button>
      </div>

      {/* Dropdown Kategori */}
      <div className="mb-4 px-4">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 transition duration-200">
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
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
          Cari
        </button>
      </div>
    </div>
  );
};

export default LocationAndSportCategoryDropdown;
