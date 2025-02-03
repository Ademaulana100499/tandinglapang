import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { getCookie } from "cookies-next";

const useEditActivity = (setIsOpen, id) => {
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
  console.log(id);
  console.log(formData);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.title || !formData.slot) {
      Swal.fire({
        title: "Error",
        text: "Judul acara dan slot wajib diisi!",
        icon: "error",
      });
      setIsLoading(false);
      return;
    }

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
        title: "Berhasil memperbarui acara!",
        icon: "success",
        confirmButtonColor: "#31c360",
      });

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
      console.error("Error:", error);
      Swal.fire({
        title: "Terjadi kesalahan",
        text: error.response ? error.response.data.message : "Unknown error",
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
