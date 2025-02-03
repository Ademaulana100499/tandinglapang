import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { getCookie } from "cookies-next";
import dayjs from "dayjs"; // Import dayjs

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

    // Format the times to match H:i format
    const formattedStartTime = dayjs(formData.start_time, "HH:mm").format(
      "HH:mm"
    );
    const formattedEndTime = dayjs(formData.end_time, "HH:mm").format("HH:mm");

    // Replace formData with formatted times
    const updatedFormData = {
      ...formData,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
    };

    if (
      !updatedFormData.title ||
      !updatedFormData.slot ||
      !updatedFormData.activity_date ||
      !updatedFormData.start_time ||
      !updatedFormData.end_time
    ) {
      Swal.fire({
        title: "Error",
        text: "Semua data wajib diisi!",
        icon: "error",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Send the updated form data to the API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sport-activities/update/${id}`,
        updatedFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      console.log("Response:", response); // Debugging response

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
      console.error("Error:", error.response || error.message);

      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        Swal.fire({
          title: "Terjadi kesalahan",
          text:
            error.response.data.message ||
            error.response.data.error ||
            "Unknown error",
          icon: "error",
          confirmButtonColor: "#31c360",
        });
      } else {
        Swal.fire({
          title: "Terjadi kesalahan",
          text: error.message || "Unknown error",
          icon: "error",
          confirmButtonColor: "#31c360",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFormEdit, setFormData, formData, isLoading };
};

export default useEditActivity;
