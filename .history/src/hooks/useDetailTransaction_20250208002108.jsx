import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

const useTransactionDetail = (id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const fetchData = async () => {
    if (!id) return;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      setData(res.data.result);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleImageClick = (url) => {
    setImageUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImageUrl("");
  };

  return {
    data,
    isLoading,
    isModalOpen,
    imageUrl,
    handleImageClick,
    closeModal,
    fetchData,
  };
};

export default useTransactionDetail;
