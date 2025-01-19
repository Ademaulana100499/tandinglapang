import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import SportCategoryDropdown from "@/components/SportCategoryDropdown/SportCategoryDropdown";

const ActivityPage = ({ data }) => {
  const router = useRouter();

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>
        <SportCategoryDropdown />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/explore/${item.id}`)}
                className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-md transition">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">
                  Category: {item.sport_category?.name || "Unknown"}
                </p>
                <p className="text-sm">
                  Address: {item.address || "Not available"}
                </p>
                <p className="text-sm">Price: {item.price || "Free"}</p>
                <p className="text-sm">
                  Discount: {item.price_discount || "None"}
                </p>
                <p className="text-sm">Slot: {item.slot || "N/A"}</p>
                <p className="text-sm">Date: {item.activity_date || "TBA"}</p>
                <p className="text-sm">
                  Time: {item.start_time || "TBA"} - {item.end_time || "TBA"}
                </p>

                <h3 className="text-sm font-medium mt-2">Participants:</h3>
                <ul className="list-disc pl-4 text-sm">
                  {item.participants && item.participants.length > 0 ? (
                    item.participants.map((participant) => (
                      <li key={participant.id}>
                        {participant.user?.name || "Unknown"}
                      </li>
                    ))
                  ) : (
                    <li>No participants yet</li>
                  )}
                </ul>

                <p className="text-sm font-medium mt-2">
                  Organizer: {item.organizer?.name || "Unknown"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No activities found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ActivityPage;

export async function getServerSideProps(context) {
  try {
    const { city, category } = context.query;

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sport-activities`,
      {
        params: {
          is_paginate: false,
          per_page: 5,
          page: 1,
          search: "",
          sport_category_id: category || "",
          city_id: city || "",
        },
        headers: {
          Authorization: context.req.cookies.token
            ? `Bearer ${context.req.cookies.token}`
            : "",
        },
      }
    );

    return { props: { data: res.data.result.data || [] } };
  } catch (error) {
    console.error("Error fetching activities:", error);
    return { props: { data: [] } };
  }
}
