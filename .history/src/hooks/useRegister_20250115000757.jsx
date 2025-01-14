import { useRouter } from "next/router";
import { handleRegister } from "@/services/auth";
import { useState } from "react";
import Swal from "sweetalert2";

const useRegister = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    c_password: "",
    phone_number: "",
  });

  const handleFormRegister = async () => {
    try {
      const response = await handleRegister(formData);
      console.log(response);
      Swal.fire({
        title: response.message,
        icon: "success",
        draggable: true,
      });
      router.push("/login");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: error.message,
        icon: "error",
        draggable: true,
      });
    }
  };

  return { handleFormRegister, setFormData, formData };
};

export default useRegister;
