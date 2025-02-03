import { useState } from "react";
import Select from "react-select";
import useLocation from "@/hooks/useLocation";

export const LocationDropdown = ({ selectedLocation, setSelectedLocation }) => {
  const locations = useLocation();

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  return (
    <div className="w-full sm:w-60">
      <Select
        value={selectedLocation}
        onChange={handleLocationChange}
        options={locations.map((location) => ({
          label: location.province_name,
          options: location.cities.map((city) => ({
            value: {
              province_id: location.province_id,
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
  );
};
