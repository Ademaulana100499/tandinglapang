import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
import Link from "next/link";
const activityDetail = ({ data }) => {
  console.log(data);
  return (
    <div>
      <Navbar />
      <h1>detail</h1>
      <Link href="/explore">Back</Link>
      <h1>{data.title}</h1>
      <Footer />
    </div>
  );
};

export default activityDetail;

export async function getServerSideProps(context) {
  const param = context.params || { id: "" };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sport-activities/${param.id}`,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies.token}`,
        },
      }
    );
    console.log(res);
    return { props: { data: res.data.result || [] } };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { props: { data: {} } };
  }
}
