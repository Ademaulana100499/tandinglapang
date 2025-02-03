import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { getCookie } from "cookies-next";

const useEditActivity = (setIsOpen) => {
  const [formData, setFormData] = useState({
    sport_category_id: "",
    city_id: "",
    title: "",
    description: "",
    slot: "",
    price: "",
    address: "",
    activity_date: "",
    start_time: "",
    end_time: "",
    map_url: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleFormEdit = async (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    if (!id) {
      Swal.fire({
        title: "Error",
        text: "Activity ID tidak ditemukan!",
        icon: "error",
      });
      return;
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sport-activities/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      Swal.fire({
        title: "Berhasil membuat acara!",
        icon: "success",
        confirmButtonColor: "#31c360",
      });
      window.location.reload();
      setTimeout(() => {
        setIsOpen(false);
        setFormData({
          sport_category_id: "",
          city_id: "",
          title: "",
          description: "",
          slot: "",
          price: "",
          address: "",
          activity_date: "",
          start_time: "",
          end_time: "",
          map_url: "",
        });
      }, 2000);
    } catch (error) {
      Swal.fire({
        title: "Terjadi kesalahan",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFormEdit, setFormData, formData, isLoading };
};

export default useEditActivity;
