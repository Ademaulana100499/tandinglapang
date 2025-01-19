import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
const activityDetail = ({ data }) => {
  console.log(data);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(data.description);
  }, [data.description]);
  return (
    <div>
      <Navbar />
      <Link href="/explore">Back</Link>
      <h1>detail</h1>
      <div className="sport-activity">
        <h2>{data.title}</h2>
        <p>
          <strong>Deskripsi:</strong>{" "}
          <span dangerouslySetInnerHTML={{ __html: description }} />
        </p>
        <p>
          <strong>Kategori:</strong> {data.sport_category.name}
        </p>
        <p>
          <strong>Lokasi:</strong> {data.address}
        </p>
        <p>
          <strong>Tanggal:</strong> {data.activity_date}
        </p>
        <p>
          <strong>Waktu:</strong> {data.start_time} - {data.end_time}
        </p>
        <p>
          <strong>Harga:</strong> Rp {data.price.toLocaleString()}
          <del>Rp {data.price_discount.toLocaleString()}</del>
        </p>
        <p>
          <strong>Slot Tersedia:</strong> {data.slot}
        </p>
        <p>
          <strong>Penyelenggara:</strong> {data.organizer.name} (
          {data.organizer.email})
        </p>

        <h3>Peserta:</h3>
        <ul>
          {data.participants.map((participant) => (
            <li key={participant.id}>
              {participant.user.name} ({participant.user.email})
            </li>
          ))}
        </ul>
      </div>
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
    return { props: { data: res.data.result || [] } };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { props: { data: {} } };
  }
}
