import React from "react";

export const MainLayout = () => {
  const token = getCookie("token");
  console.log(token);
  return (
    <div className="bg-gray-200 h-screen">
      <h1>Main</h1>
    </div>
  );
};
