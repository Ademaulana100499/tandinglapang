import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { getCookie } from "cookies-next";

const useEditActivity = (id) => {
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
  const handleFormEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
