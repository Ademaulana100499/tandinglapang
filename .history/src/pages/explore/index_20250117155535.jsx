import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
const explorePage = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-200 h-screen">
        <h1>explore</h1>
      </div>
      <Footer />
    </div>
  );
};

export default explorePage;
