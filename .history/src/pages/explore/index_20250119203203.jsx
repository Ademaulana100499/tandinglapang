import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
const explorePage = ({ data }) => {
  console.log(data);
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
    console.log(res);
    return { props: { data: res || [] } };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { props: { data: {} } };
  }
}
