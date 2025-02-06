import React, { useState, useEffect } from "react";
import Select from "react-select";
import useLocation from "@/hooks/useLocation";

export const LocationDropdown = ({ selectedLocation, setSelectedLocation }) => {
  const locations = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full text-xs xl:text-base">
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
        className="w-full text-xs xl:text-base rounded-sm focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
        styles={{
          menu: (provided) => ({
            ...provided,
            maxHeight: "200px",
            overflowY: "hidden",
          }),
          control: (provided) => ({
            ...provided,
            minHeight: windowWidth >= 1440 ? "45px" : "35px",
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
