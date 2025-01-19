import { useState, useEffect } from "react";
import axios from "axios";

export const useCity = (provinceId) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    if (!provinceId) return;

    const fetchCities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/location/cities/${provinceId}`
        );
        setCities(response.data.result.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [provinceId]);

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  return {
    cities,
    loading,
    selectedCity,
    handleCityChange,
  };
};
