import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useRouter } from "next/router";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import SportDropdown from "../Features/SportCategory";
export const LocationAndSportCategoryDropdown = () => {
  const router = useRouter();
  const [provinces, setProvinces] = useState([]);

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

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  // Update the button click handler to use the same query update logic.
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
    <div className="w-full z-50 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center gap-2 ">
        <div className="w-full sm:w-60">
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
            placeholder="Pilih Kota"
            className="w-full p-2 border border-green-300 rounded-sm focus:ring-2 focus:ring-green-500 focus:outline-none text-black font-medium"
            styles={{
              menu: (provided) => ({
                ...provided,
                maxHeight: "200px",
                overflow: "hidden", // Ganti "hidden" dengan "auto" agar daftar tetap scrollable
              }),
              control: (provided) => ({
                ...provided,
                minHeight: "20px", // Mengurangi tinggi kontrol
                padding: "0.25rem", // Mengurangi padding agar lebih ringkas
                borderColor: "#D1D5DB", // Warna border lebih netral
                boxShadow: "none", // Menghilangkan shadow untuk tampilan lebih flat
                backgroundColor: "#ffffff", // Warna background putih
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "black", // Pastikan teks di dalam pilihan tetap hitam
              }),
              indicatorSeparator: () => ({
                display: "none", // Menghilangkan pemisah indikator
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                color: "#4CAF50", // Warna ikon dropdown hijau untuk kesesuaian dengan border
              }),
              clearIndicator: (provided) => ({
                ...provided,
                color: "#4CAF50", // Warna ikon clear button hijau
              }),
            }}
          />
        </div>

        <SportDropdown setSelectedCategory={setSelectedCategory} />
        <div className="w-40 ">
          <InteractiveHoverButton
            onClick={handleSearch}
            className=" bg-white py-1.6 px-6 text-black hover:border-black rounded-md">
            Cari Lawan
          </InteractiveHoverButton>
        </div>
      </div>
    </div>
  );
};
