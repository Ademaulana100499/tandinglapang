import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
import { useRouter } from "next/router";
const activityPage = ({ data }) => {
  const router = useRouter();
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>
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
      </div>

      <Footer />
    </div>
  );
};

export default activityPage;

export async function getServerSideProps(context) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sport-activities`,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies.token}`,
        },
      }
    );

    return { props: { data: res.data.result.data || [] } };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { props: { data: {} } };
  }
}
