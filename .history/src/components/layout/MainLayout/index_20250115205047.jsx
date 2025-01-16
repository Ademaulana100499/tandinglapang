import React from "react";
import { getCookie } from "cookies-next";
export const MainLayout = () => {
  const token = getCookie("token");
  console.log("token" + token);
  return (
    <div className="bg-gray-200 h-screen">
      <h1>Main</h1>
    </div>
  );
};
