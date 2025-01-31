import { useState, useEffect } from "react";
import axios from "axios";

const useActivityData = (page, sport_category_id, city_id, search) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `${
          process.env.NEXT_PUBLIC_API_URL
        }/sport-activities?is_paginate=true&per_page=5&page=${page}&sport_category_id=${
          sport_category_id || ""
        }&city_id=${city_id || ""}&search=${search || ""}`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setData(res.data.result.data || []);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, sport_category_id, city_id, search]);

  return { data, loading };
};

export default useActivityData;
