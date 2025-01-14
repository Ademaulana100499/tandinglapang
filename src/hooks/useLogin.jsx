import { useEffect, useState } from "react";
import useRouter from "next/router";
import { setCookie } from "cookies-next";
import React from "react";

const useLogin = () => {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  return handleFormLogin, setFormData, formData;
};

export default useLogin;
