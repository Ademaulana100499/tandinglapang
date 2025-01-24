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
    <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 p-8 rounded-lg shadow-lg max-w-xl mx-auto">
      <div className="flex justify-between items-center text-white mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleProvincePageChange(provincePage - 1)}
            disabled={provincePage === 1}
            className="bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-full p-2 transition duration-300">
            &laquo;
          </button>
          <span className="text-xl font-semibold">Provinsi {provincePage}</span>
          <button
            onClick={() => handleProvincePageChange(provincePage + 1)}
            disabled={provincePage === totalProvincePages}
            className="bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-full p-2 transition duration-300">
            &raquo;
          </button>
        </div>
      </div>

      <div className="mb-6">
        <Select
          value={selectedProvince}
          onChange={handleProvinceChange}
          options={provinces.map((province) => ({
            value: province.province_id,
            label: province.province_name,
          }))}
          placeholder="Pilih Provinsi"
          className="text-black"
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
            className="text-black"
          />
        </div>
      )}

      <div className="flex justify-between items-center text-white mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleCategoryPageChange(categoryPage - 1)}
            disabled={categoryPage === 1}
            className="bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-full p-2 transition duration-300">
            &laquo;
          </button>
          <span className="text-xl font-semibold">Sport {categoryPage}</span>
          <button
            onClick={() => handleCategoryPageChange(categoryPage + 1)}
            disabled={categories.length < 5}
            className="bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-full p-2 transition duration-300">
            &raquo;
          </button>
        </div>
      </div>

      <div className="mb-6">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-3 rounded-lg bg-white text-black shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Pilih kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          className="bg-indigo-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600 transition duration-300 w-full md:w-auto">
          Cari
        </button>
      </div>
    </div>
  );
};

export default LocationAndSportCategoryDropdown;
