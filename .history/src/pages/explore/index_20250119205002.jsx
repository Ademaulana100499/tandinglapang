import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
const explorePage = ({ data }) => {
  console.log(data);
  return (
    <div>
      <Navbar />
      <div className="bg-gray-200 h-screen">
        <h1>explore</h1>
        {data.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.sport_category.name}</p>
            <p>{item.address}</p>
            <p>{item.price}</p>
            <p>{item.price_discount}</p>
            <p>{item.slot}</p>
            <p>{item.activity_date}</p>
            <p>{item.start_time}</p>
            <p>{item.end_time}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default explorePage;

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
