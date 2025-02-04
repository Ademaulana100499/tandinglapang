import Select from "react-select";
import useLocation from "@/hooks/useLocation";

export const LocationDropdown = ({ selectedLocation, setSelectedLocation }) => {
  const locations = useLocation();

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

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
        className="w-full  text-xs xl:text-base rounded-sm focus:ring-2 focus:ring-green-500 focus:outline-none text-black "
        styles={{
          menu: (provided) => ({
            ...provided,
            maxHeight: "200px",
            overflow: "hidden",
          }),
          control: (provided) => ({
            ...provided,
            minHeight: window.matchMedia("(min-width: 1440px)").matches ? "20px" : "10px",
            borderColor: "#D1D5DB",
            boxShadow: "none",
            backgroundColor: "#ffffff",
          })
          
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
