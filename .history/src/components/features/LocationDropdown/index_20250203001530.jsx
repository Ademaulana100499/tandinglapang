import { useState } from "react";
import Select from "react-select";
import useLocation from "@/hooks/useLocation";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import SportDropdown from "../SportCategory";

export const LocationDropdown = () => {
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  const handleSearch = () => {
    const query = {
      sport_category_id: selectedCategory || "",
      city_id: selectedLocation ? selectedLocation.value.city_id : "",
    };
    window.location.reload();
  };

  return (
    <div className="w-full z-50 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center gap-2">
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
                overflow: "auto",
              }),
              control: (provided) => ({
                ...provided,
                minHeight: "20px",
                padding: "0.25rem",
                borderColor: "#D1D5DB",
                boxShadow: "none",
                backgroundColor: "#ffffff",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "black",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                color: "#4CAF50",
              }),
              clearIndicator: (provided) => ({
                ...provided,
                color: "#4CAF50",
              }),
            }}
          />
        </div>

        <SportDropdown setSelectedCategory={setSelectedCategory} />

        <div className="w-40">
          <InteractiveHoverButton
            onClick={handleSearch}
            className="bg-white py-1.6 px-6 text-black hover:border-black rounded-md">
            Cari Lawan
          </InteractiveHoverButton>
        </div>
      </div>
    </div>
  );
};
