import { fetchAPI } from "./api";

interface {
  email :"";
  password:"" ;
}

export const handleLogin = async (loginData) => {
  return await fetchAPI({
    method: "POST",
    url: "/login",
    data: loginData,
  });
};
