import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useRouter } from "next/router";

const LocationAndSportCategoryDropdown = () => {
  const router = useRouter();
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryPage, setCategoryPage] = useState(1);

  // Mengambil seluruh data provinsi dan kota
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const provinceResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/location/provinces`
        );
        const provinceData = provinceResponse.data.result.data;

        let allLocations = [];

        for (let province of provinceData) {
          const cityResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/location/cities/${province.province_id}`
          );
          const cityData = cityResponse.data.result.data;

          // Gabungkan provinsi dan kota
          cityData.forEach((city) => {
            allLocations.push({
              value: `${province.province_id}-${city.city_id}`,
              label: `${province.province_name} - ${city.city_name}`,
            });
          });
        }

        setLocations(allLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

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

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCategoryPageChange = (newPage) => {
    setCategoryPage(newPage);
  };

  const handleSearch = () => {
    const [provinceId, cityId] = selectedLocation.value.split("-");
    const query = {
      sport_category_id: selectedCategory || "",
      city_id: cityId,
    };

    router.push({
      pathname: "/explore",
      query,
    });
  };

  return (
    <div className="w-full mt-1 z-50 max-w-6xl mx-auto">
      {/* Dropdown Provinsi dan Kota */}
      <div className="mb-4 px-4">
        <Select
          value={selectedLocation}
          onChange={handleLocationChange}
          options={locations}
          placeholder="Pilih Provinsi - Kota"
          className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 transition duration-200"
        />
      </div>

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
