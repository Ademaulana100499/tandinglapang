import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
import Link from "next/link";

const ActivityDetail = ({ data }) => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data.description) {
      setDescription(data.description);
    }
    setIsLoading(false);
  }, [data.description]);

  // Handle if data is empty or loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <div>Data not found</div>;
  }

  return (
    <div>
      <Navbar />
      <Link href="/explore">Back</Link>
      <h1>Detail</h1>
      <div className="sport-activity">
        <h2>{data.title}</h2>
        <p>
          <strong>Deskripsi:</strong>{" "}
          <span dangerouslySetInnerHTML={{ __html: description }} />
        </p>
        <p>
          <strong>Kategori:</strong> {data.sport_category?.name || "N/A"}
        </p>
        <p>
          <strong>Lokasi:</strong> {data.address || "N/A"}
        </p>
        <p>
          <strong>Tanggal:</strong> {data.activity_date || "N/A"}
        </p>
        <p>
          <strong>Waktu:</strong> {data.start_time} - {data.end_time}
        </p>
        <p>
          <strong>Harga:</strong> Rp {data.price?.toLocaleString() || "N/A"}
          <del>Rp {data.price_discount?.toLocaleString() || "N/A"}</del>
        </p>
        <p>
          <strong>Slot Tersedia:</strong> {data.slot || "N/A"}
        </p>
        <p>
          <strong>Penyelenggara:</strong> {data.organizer?.name || "N/A"} (
          {data.organizer?.email || "N/A"})
        </p>

        <h3>Peserta:</h3>
        <ul>
          {data.participants?.length > 0 ? (
            data.participants.map((participant) => (
              <li key={participant.id}>
                {participant.user.name} ({participant.user.email})
              </li>
            ))
          ) : (
            <li>No participants</li>
          )}
        </ul>
        <p>
          <strong>Lokasi di Map:</strong>{" "}
          <a href={data.map_url} target="_blank" rel="noopener noreferrer">
            Klik di sini
          </a>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default ActivityDetail;

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
    return { props: { data: res.data.result || {} } };
  } catch (error) {
    console.error("Error fetching activity details:", error);
    return { props: { data: {} } };
  }
}
