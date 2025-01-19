import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import SportCategoryDropdown from "@/components/SportCategoryDropdown/SportCategoryDropdown";

const ActivityPage = ({ data, page }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Memfilter data berdasarkan kategori yang dipilih
    if (selectedCategory) {
      const newFilteredData = data.filter(
        (item) => item.sport_category.id === selectedCategory
      );
      setFilteredData(newFilteredData);
    } else {
      // Jika tidak ada filter, tampilkan semua data
      setFilteredData(data);
    }
  }, [selectedCategory, data]);

  const handlePageChange = (newPage) => {
    router.push({
      pathname: "/explore",
      query: {
        ...router.query,
        page: newPage, // Mengubah halaman di query string
      },
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Menyimpan kategori yang dipilih
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>

        {/* Menampilkan Dropdown untuk memilih kategori */}
        <SportCategoryDropdown onCategoryChange={handleCategoryChange} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/explore/${item.id}`)}
              className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">
                Category: {item.sport_category.name}
              </p>
              <p className="text-sm">Address: {item.address}</p>
              <p className="text-sm">Price: {item.price}</p>
              <p className="text-sm">Discount: {item.price_discount}</p>
              <p className="text-sm">Slot: {item.slot}</p>
              <p className="text-sm">Date: {item.activity_date}</p>
              <p className="text-sm">
                Time: {item.start_time} - {item.end_time}
              </p>

              <h3 className="text-sm font-medium mt-2">Participants:</h3>
              <ul className="list-disc pl-4 text-sm">
                {item.participants.map((participant) => (
                  <li key={participant.id}>{participant.user.name}</li>
                ))}
              </ul>

              <p className="text-sm font-medium mt-2">
                Organizer: {item.organizer.name}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 bg-gray-300 rounded-l">
            Previous
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={filteredData.length < 5}
            className="px-4 py-2 bg-gray-300 rounded-r">
            Next
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ActivityPage;

export async function getServerSideProps(context) {
  try {
    const { page = 1 } = context.query;

    // URL tanpa filter kategori dan kota untuk mendapatkan semua data
    const url = `${process.env.NEXT_PUBLIC_API_URL}/sport-activities?is_paginate=false&per_page=5&page=${page}`;

    // Mengambil data dari API
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${context.req.cookies.token}`,
      },
    });

    return {
      props: { data: res.data.result.data || [], page: parseInt(page) },
    };
  } catch (error) {
    console.error("Error fetching activities:", error);
    return { props: { data: [], page: 1 } };
  }
}
