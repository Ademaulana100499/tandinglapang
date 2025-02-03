import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { getCookie } from "cookies-next";

const useCreateActivity = () => {
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

  const handleFormCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validasi data sebelum mengirim ke server
    if (
      !formData.sport_category_id ||
      !formData.city_id ||
      !formData.title ||
      !formData.description ||
      !formData.slot ||
      !formData.price ||
      !formData.address ||
      !formData.activity_date ||
      !formData.start_time ||
      !formData.end_time ||
      !formData.map_url
    ) {
      Swal.fire({
        title: "Semua field harus diisi!",
        icon: "warning",
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sport-activities/create`,
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

  return { handleFormCreate, setFormData, formData, isLoading };
};

export default useCreateActivity;
