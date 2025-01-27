import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useRouter } from "next/router";

const LocationAndSportCategoryDropdown = () => {
  const router = useRouter();
  const [provinces, setProvinces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProvincesAndCities = async () => {
      let allProvinces = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/location/provinces?page=${page}`
          );

          const newProvinces = response.data.result.data;
          for (let province of newProvinces) {
            const citiesResponse = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/location/cities/${province.province_id}`
            );
            province.cities = citiesResponse.data.result.data;
          }

          allProvinces = [...allProvinces, ...newProvinces];

          if (newProvinces.length < response.data.result.per_page) {
            hasMore = false;
          } else {
            page++;
          }
        } catch (error) {
          console.error("Error fetching provinces and cities:", error);
          hasMore = false;
        }
      }

      setProvinces(allProvinces);
    };

    fetchProvincesAndCities();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sport-categories`
        );
        setCategories(response.data.result.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearch = () => {
    const query = {
      sport_category_id: selectedCategory || "",
      city_id: selectedLocation ? selectedLocation.value.city_id : "",
    };

    router.push({
      pathname: "/explore",
      query,
    });
  };

  return (
    <div className="w-full mt-1 z-50 max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-center items-center gap-2 ">
        <div className=" min-w-60">
          <Select
            value={selectedLocation}
            onChange={handleLocationChange}
            options={provinces.map((province) => ({
              label: province.province_name,
              options: province.cities.map((city) => ({
                value: {
                  province_id: province.province_id,
                  city_id: city.city_id,
                },
                label: city.city_name_full,
              })),
            }))}
            placeholder="Pilih Provinsi dan Kota"
            className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 transition duration-200"
          />
        </div>

        <div className=" min-w-30">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 transition duration-200">
            <option value="">Pilih kategori</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="w-40 sm:w-6xl">
          <button
            onClick={handleSearch}
            className="w-full px-4  py-2 bg-black text-white rounded-lg hover:bg-green-500 hover:text-black transition duration-300">
            Cari Lapangan
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationAndSportCategoryDropdown;
