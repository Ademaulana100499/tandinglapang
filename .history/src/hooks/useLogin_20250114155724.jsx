import { useEffect, useState } from "react";
import React from "react";

const useLogin = () => {
    const [isClient, setIsClient] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    })
  return handleFormLogin, setFormData, formData;
};

export default useLogin;
