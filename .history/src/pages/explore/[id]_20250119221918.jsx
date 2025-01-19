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
      <div className="container mx-auto p-4">
        <Link
          className="text-blue-500 hover:underline mb-4 inline-block"
          href="/explore">
          Back
        </Link>
        <h1 className="text-3xl font-bold mb-4">Detail</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">{data.title}</h2>
          <p className="mb-4">
            <strong className="font-semibold">Deskripsi:</strong>
            <span dangerouslySetInnerHTML={{ __html: description }} />
          </p>
          <p className="mb-2">
            <strong className="font-semibold">Kategori:</strong>
            {data.sport_category?.name}
          </p>
          <p className="mb-2">
            <strong className="font-semibold">Lokasi:</strong>
            {data.address}
          </p>
          <p className="mb-2">
            <strong className="font-semibold">Tanggal:</strong>
            {data.activity_date}
          </p>
          <p className="mb-2">
            <strong className="font-semibold">Waktu:</strong> {data.start_time}-{" "}
            {data.end_time}
          </p>
          <p className="mb-2">
            <strong className="font-semibold">Harga:</strong> Rp
            {data.price?.toLocaleString()}
            <strong className="font-semibold">Harga:</strong> Rp
            {data.price?.toLocaleString()}
            <p className="text-red-500">
              Rp {data.price_discount?.toLocaleString()}
            </p>
          </p>
          <p className="mb-2">
            <strong className="font-semibold">Slot Tersedia:</strong>
            {data.slot}
          </p>
          <p className="mb-4">
            <strong className="font-semibold">Penyelenggara:</strong>
            {data.organizer?.name} ({data.organizer?.email})
          </p>

          <h3 className="text-xl font-semibold mb-2">Peserta:</h3>
          <ul className="list-disc pl-6 mb-4">
            {data.participants?.length > 0 ? (
              data.participants.map((participant) => (
                <li key={participant.id} className="mb-2">
                  {participant.user.name} ({participant.user.email})
                </li>
              ))
            ) : (
              <li>No participants</li>
            )}
          </ul>
          <p>
            <strong className="font-semibold">Lokasi di Map:</strong>
            <a
              href={data.map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline">
              Klik di sini
            </a>
          </p>
        </div>
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
