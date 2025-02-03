import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { getCookie } from "cookies-next";

const useCreateActivity = (setIsOpen) => {
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

    const isEmptyField = Object.values(formData).some((value) => value === "");
    if (isEmptyField) {
      Swal.fire({
        title: "Semua kolom harus diisi!",
        text: "Pastikan semua data Anda telah diisi.",
        icon: "warning",
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    }

    const { start_time, end_time } = formData;
    if (start_time && end_time && start_time >= end_time) {
      Swal.fire({
        title: "Jam mulai lebih besar dari jam akhir!",
        text: "Periksa kembali jam mulai dan jam akhir yang Anda masukkan.",
        icon: "warning",
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    }
    const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD
    if (formData.activity_date && formData.activity_date < today) {
      Swal.fire({
        title: "Tanggal acara tidak boleh kurang dari hari ini!",
        text: "Pastikan Anda memilih tanggal yang valid.",
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
        title: error.response
          ? error.response.data.message
          : "Terjadi kesalahan",
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
