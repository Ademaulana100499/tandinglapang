import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const LocationDropdown = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [provincePage, setProvincePage] = useState(1);
  const [totalProvincePages, setTotalProvincePages] = useState(1);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/location/provinces?is_paginate=true&per_page=5&page=${provincePage}`
        );
        setProvinces(response.data.result.data);
        setTotalProvincePages(response.data.result.last_page);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching provinces:", error);
        setLoading(false);
      }
    };

    fetchProvinces();
  }, [provincePage]);

  useEffect(() => {
    if (selectedProvince) {
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
    }
  }, [selectedProvince]);

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    setSelectedCity(null);
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const handleProvincePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalProvincePages) {
      setProvincePage(newPage);
    }
  };

  const provinceOptions = provinces.map((province) => ({
    value: province.province_id,
    label: province.province_name,
  }));

  const cityOptions = cities.map((city) => ({
    value: city.city_id,
    label: city.city_name,
  }));

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-4">
            <button
              onClick={() => handleProvincePageChange(provincePage - 1)}
              disabled={provincePage === 1}
              className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200">
              &laquo;
            </button>
            <span className="mx-2">
              Provinsi {provincePage} of {totalProvincePages}
            </span>
            <button
              onClick={() => handleProvincePageChange(provincePage + 1)}
              disabled={provincePage === totalProvincePages}
              className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200">
              &raquo;
            </button>
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <Select
                value={selectedProvince}
                onChange={handleProvinceChange}
                options={provinceOptions}
                placeholder="Pilih Provinsi"
                className="w-full"
              />
            </div>
            {selectedProvince && (
              <div className="flex-1 min-w-[200px]">
                <Select
                  value={selectedCity}
                  onChange={handleCityChange}
                  options={cityOptions}
                  placeholder="Pilih Kota"
                  className="w-full"
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LocationDropdown;
