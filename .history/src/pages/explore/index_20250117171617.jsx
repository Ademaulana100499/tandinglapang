import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
const explorePage = ({ data }) => {
  const router = useRouter();
  console.log(data);
  return (
    <div>
      <Navbar />
      <div className="bg-gray-200 h-96">
        <h1>explore</h1>
        <div>
          <h1>Sport Activities</h1>

          {/* Form Pencarian */}

          {/* List Aktivitas */}
          {data.length > 0 ? (
            <ul>
              {data.map((activity) => (
                <li key={activity.id}>
                  <h3>{activity.title}</h3>
                  <p>
                    <strong>Category:</strong> {activity.sport_category.name}{" "}
                    <br />
                    <strong>Price:</strong> Rp {activity.price.toLocaleString()}{" "}
                    (Discount: Rp {activity.price_discount.toLocaleString()}){" "}
                    <br />
                    <strong>Slots:</strong> {activity.slot} <br />
                    <strong>Location:</strong> {activity.address},{" "}
                    {activity.city.city_name} <br />
                    <strong>Date:</strong> {activity.activity_date} <br />
                    <strong>Time:</strong> {activity.start_time} -{" "}
                    {activity.end_time} <br />
                    <strong>Organizer:</strong> {activity.organizer.name} (
                    {activity.organizer.email}) <br />
                  </p>

                  {/* List Peserta */}
                  <h4>Participants:</h4>
                  <ul>
                    {activity.participants.map((participant) => (
                      <li key={participant.id}>
                        {participant.user.name} ({participant.user.email})
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No sport activities found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default explorePage;

export async function getServerSideProps({ query, req }) {
  const token = req.cookies.token;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sport-activities`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data.result);
    return { props: { data: res.data || [] } };
  } catch (error) {
    console.error("Error fetching sport activities:", error);
    return { props: { data: [] } };
  }
}
