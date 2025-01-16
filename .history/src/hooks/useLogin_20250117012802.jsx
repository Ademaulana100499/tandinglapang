import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const useLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleFormLogin = async () => {
    if (!formData.email || !formData.password) {
      Swal.fire({
        title: res.data.message,
        icon: "success",
        draggable: true,
      });
      return;
    }

    try {
      const res = await axios.post("/api/authentication/ssrlogin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      Swal.fire({
        title: res.data.message,
        icon: "success",
        draggable: true,
      });
      setCookie("token", res.data.data.token);
      router.push("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.data.message,
        icon: "error",
        draggable: true,
      });
    }
  };

  return { handleFormLogin, setFormData, formData };
};

export default useLogin;
