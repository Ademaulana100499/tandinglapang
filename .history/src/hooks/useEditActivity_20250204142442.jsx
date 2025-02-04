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
  const [isLoading, setIsLoading] = useState(false);
  const handleFormEdit = async (e) => {
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
    const today = new Date().toISOString().split("T")[0];
    if (formData.activity_date && formData.activity_date < today) {
      Swal.fire({
        title: "Tanggal acara harus lebih dari hari ini!",
        text: "Pastikan Anda memilih tanggal yang valid.",
        icon: "warning",
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
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

      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Terjadi kesalahan",
        text: error.message,
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
