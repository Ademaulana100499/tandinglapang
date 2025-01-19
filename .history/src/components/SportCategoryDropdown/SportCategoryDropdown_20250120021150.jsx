import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useRouter } from "next/router";

// Custom hook for fetching data
const useFetchData = (url, params) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, { params });
        setData(response.data.result.data);
        setPagination({
          currentPage: response.data.result.current_page,
          totalPages: response.data.result.last_page,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, params]);

  return { data, loading, pagination };
};

const LocationAndSportCategoryDropdown = () => {
  const router = useRouter();
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [provincePage, setProvincePage] = useState(1);
  const [categoryPage, setCategoryPage] = useState(1);

  // Fetch provinces, cities, and categories using custom hook
  const {
    data: provinces,
    loading: provincesLoading,
    pagination: provincePagination,
  } = useFetchData(`${process.env.NEXT_PUBLIC_API_URL}/location/provinces`, {
    is_paginate: true,
    per_page: 5,
    page: provincePage,
  });

  const { data: cities, loading: citiesLoading } = useFetchData(
    `${process.env.NEXT_PUBLIC_API_URL}/location/cities/${selectedProvince?.value}`,
    {}
  );

  const { data: categories, loading: categoriesLoading } = useFetchData(
    `${process.env.NEXT_PUBLIC_API_URL}/sport-categories`,
    { is_paginate: true, per_page: 5, page: categoryPage }
  );

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    setSelectedCity(null); // Reset city when province changes
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearch = () => {
    const query = {
      city_id: selectedCity ? selectedCity.value : "",
      sport_category_id: selectedCategory || "",
    };

    router.push({
      pathname: "/explore",
      query,
    });
  };

  return (
    <div>
      {provincesLoading || citiesLoading || categoriesLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Province pagination */}
          <div>
            <button
              onClick={() => setProvincePage(provincePage - 1)}
              disabled={provincePage === 1}>
              &laquo;
            </button>
            <span>
              Provinsi {provincePage} dari {provincePagination.totalPages}
            </span>
            <button
              onClick={() => setProvincePage(provincePage + 1)}
              disabled={provincePage === provincePagination.totalPages}>
              &raquo;
            </button>
          </div>

          {/* Province Select */}
          <Select
            value={selectedProvince}
            onChange={handleProvinceChange}
            options={provinces.map((province) => ({
              value: province.province_id,
              label: province.province_name,
            }))}
            placeholder="Pilih Provinsi"
          />

          {/* City Select */}
          {selectedProvince && (
            <Select
              value={selectedCity}
              onChange={handleCityChange}
              options={cities.map((city) => ({
                value: city.city_id,
                label: city.city_name,
              }))}
              placeholder="Pilih Kota"
            />
          )}

          {/* Category pagination */}
          <div>
            <button
              onClick={() => setCategoryPage(categoryPage - 1)}
              disabled={categoryPage === 1}>
              &laquo;
            </button>
            <span>Sport {categoryPage}</span>
            <button
              onClick={() => setCategoryPage(categoryPage + 1)}
              disabled={categories.length < 5}>
              &raquo;
            </button>
          </div>

          {/* Category Select */}
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Pilih kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Search Button */}
          <div>
            <button onClick={handleSearch}>Cari</button>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationAndSportCategoryDropdown;
