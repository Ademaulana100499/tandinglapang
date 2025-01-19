import { useState, useEffect } from "react";
import axios from "axios";

export const useProvince = (page = 1) => {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProvince, setSelectedProvince] = useState(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/location/provinces?is_paginate=true&per_page=5&page=${page}`
        );
        setProvinces(response.data.result.data);
        setTotalPages(response.data.result.last_page);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, [page]);

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
  };

  const handleProvincePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setProvincePage(newPage);
    }
  };

  return {
    provinces,
    loading,
    totalPages,
    selectedProvince,
    handleProvinceChange,
    handleProvincePageChange,
  };
};
