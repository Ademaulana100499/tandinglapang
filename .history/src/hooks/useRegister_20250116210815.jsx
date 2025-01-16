import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const useRegister = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    c_password: "",
    role: "user",
    phone_number: "",
  });

  const handleFormRegister = async () => {
    const emptyFields = Object.entries(formData).filter(
      ([key, value]) => value === ""
    );

    if (emptyFields.length > 0) {
      const emptyFieldNames = emptyFields.map(([key]) => key).join(", ");
      alert(`Field berikut tidak boleh kosong: ${emptyFieldNames}`);
      return;
    }

    // Cek jika password dan konfirmasi password tidak cocok
    if (formData.password !== formData.c_password) {
      alert("Password dan konfirmasi password harus sama");
      return;
    }

    try {
      const res = await axios.post("/api/authentication/ssrregist", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (!res.ok && res.data.error.data.email !== undefined) {
        Swal.fire({
          title: res.data.error.data.email,
          icon: "error",
          draggable: true,
        });
      } else if (!res.ok && res.data.message !== undefined) {
        Swal.fire({
          title: res.data.message,
          icon: "error",
          draggable: true,
        });
      } else {
        Swal.fire({
          title: res.data.message,
          icon: "success",
          draggable: true,
        });
        router.push("/login");
      }
    } catch (error) {
      Swal.fire({
        title: error.data.message,
        icon: "error",
        draggable: true,
      });
    }
  };

  return { handleFormRegister, setFormData, formData };
};

export default useRegister;
