import React from "react";
import { getCookie } from "cookies-next";
import LocationAndSportCategoryDropdown from "@/components/SportCategoryDropdown";
export const MainLayout = () => {
  const token = getCookie("token");
  console.log("token" + token);
  return (
    <div className="bg-gray-200 h-screen">
      <h1>Main</h1>
      <LocationAndSportCategoryDropdown />
    </div>
  );
};
