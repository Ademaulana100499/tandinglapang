import { useState, useEffect } from "react";
import axios from "axios";

const useLocation = () => {
  const [location, setLocation] = useState([]);

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

      setLocation(allProvinces);
    };

    fetchProvincesAndCities();
  }, []);

  return location;
};

export default useLocation;
