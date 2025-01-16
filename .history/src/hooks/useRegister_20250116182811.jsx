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
      Swal.fire({
        title: res.data.message,
        icon: "success",
        draggable: true,
      });
      router.push("/login");
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        title: error,
        icon: "error",
        draggable: true,
      });
    }
  };

  return { handleFormRegister, setFormData, formData };
};

export default useRegister;
