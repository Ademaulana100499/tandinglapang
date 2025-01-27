import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import SportCategoryDropdown from "@/components/SportCategoryDropdown/SportCategoryDropdown";
import { parseCookies } from "nookies";
// import Authorization from "@/components/features/Auth";
const ActivityPage = ({ data, page }) => {
  // const router = useRouter();
  // const handlePageChange = (newPage) => {
  //   router.push({
  //     pathname: "/explore",
  //     query: {
  //       ...router.query,
  //       page: newPage,
  //     },
  //   });
  // };
  return (
    <div>
      <h1>test</h1>
      {/* <Authorization> */}
      {/* <Navbar />
      <div id="explore" className="bg-gray-100 min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>
        <SportCategoryDropdown />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => (
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
              <p className="text-sm">
                Discount: {item.price_discount || "N/A"}
              </p>
              <p className="text-sm">Slot: {item.slot}</p>
              <p className="text-sm">Date: {item.activity_date}</p>
              <p className="text-sm">
                Time: {item.start_time} - {item.end_time}
              </p>
              <h3 className="text-sm font-medium mt-2">Participants:</h3>
              <ul className="list-disc pl-4 text-sm">
                {item.participants.length > 0 ? (
                  item.participants.map((participant) => (
                    <li key={participant.id}>{participant.user.name}</li>
                  ))
                ) : (
                  <li>No participants yet</li>
                )}
              </ul>
              <p className="text-sm font-medium mt-2">
                Organizer: {item.organizer.name}
              </p>
              <p className="text-sm">
                Location: {item.city.city_name},{" "}
                {item.city.province.province_name}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 bg-gray-300 rounded-l">
            Previous
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={data.length < 5}
            className="px-4 py-2 bg-gray-300 rounded-r">
            Next
          </button>
        </div>
      </div>
      <Footer /> */}
      {/* </Authorization> */}
    </div>
  );
};

export default ActivityPage;

export async function getServerSideProps(context) {
  try {
    const cookies = parseCookies(context);
    const token = cookies.token || ""; // Ambil token dari cookies dengan aman

    console.log("Token dari cookies:", token); // Debug token

    if (!token) {
      return { redirect: { destination: "/login", permanent: false } };
    }

    const { page = 1, sport_category_id, city_id, search } = context.query;
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }/sport-activities?is_paginate=true&per_page=5&page=${page}&sport_category_id=${
      sport_category_id || ""
    }&city_id=${city_id || ""}&search=${search || ""}`;

    console.log("Fetching data from:", url); // Debug API URL

    const resApi = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Response from API:", resApi.data); // Debug API response

    return {
      props: { data: resApi.data.result.data || [], page: parseInt(page) },
    };
  } catch (error) {
    console.error(
      "Error fetching activities:",
      error.response?.data || error.message
    );
    return { props: { data: [], page: 1 } };
  }
}
