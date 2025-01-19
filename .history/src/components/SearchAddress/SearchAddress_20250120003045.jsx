import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const LocationDropdown = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/location/provinces`
        );
        setProvinces(response.data.result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching provinces:", error);
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

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
          <div>
            <Select
              value={selectedProvince}
              onChange={handleProvinceChange}
              options={provinceOptions}
              placeholder="Pilih Provinsi"
            />
          </div>

          {selectedProvince && (
            <>
              <div>
                <Select
                  value={selectedCity}
                  onChange={handleCityChange}
                  options={cityOptions}
                  placeholder="Pilih Kota"
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LocationDropdown;
