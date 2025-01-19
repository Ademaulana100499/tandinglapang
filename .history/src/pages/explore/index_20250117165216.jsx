import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
const explorePage = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-200 h-96">
        <h1>explore</h1>
      </div>
      <Footer />
    </div>
  );
};

export default explorePage;

export async function getServerSideProps({ query, req }) {
  const token = req.cookies.token || "";
  const search = query.search || "";
  const sport_category_id = query.sport_category_id || "";
  const city_id = query.city_id || 3171;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sport-activities`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          is_paginate: false,
          per_page: 5,
          page: 1,
          search,
          sport_category_id,
          city_id,
        },
      }
    );

    return { props: { data: res.data.result || [] } };
  } catch (error) {
    console.error("Error fetching sport activities:", error);
    return { props: { data: [] } };
  }
}
