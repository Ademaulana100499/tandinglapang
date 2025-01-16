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
    try {
      const res = await axios.post("/api/authentication/ssrregist", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res);

      // Jika response berhasil
      if (res.data.success) {
        Swal.fire({
          title: res.data.message,
          icon: "success",
          draggable: true,
        });
        router.push("/login"); // Pindahkan pengalihan ini hanya setelah registrasi berhasil
      } else {
        Swal.fire({
          title: res.data.message || "Registration failed",
          icon: "error",
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        title: "An error occurred during registration.",
        icon: "error",
        draggable: true,
      });
    }
  };

  return { handleFormRegister, setFormData, formData };
};

export default useRegister;
