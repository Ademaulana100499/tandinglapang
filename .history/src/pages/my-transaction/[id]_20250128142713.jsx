import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";

const DetailMyTransaction = ({ data }) => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data.transaction_items.sport_activities.description) {
      setDescription(data.transaction_items.sport_activities.description);
    }
    setIsLoading(false);
  }, [data.transaction_items.sport_activities.description]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <div>Data not found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
          Detail Transaksi
        </h1>
        <div className="bg-white shadow-lg  p-6 w-full max-w-3xl border-2 border-green-400">
          <h2 className="text-xl font-semibold text-black">
            Invoice: {data.invoice_id}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            <strong>Status:</strong>{" "}
            <span
              className={`font-medium ${
                data.status === "Pending" ? "text-blue-500" : "text-green-600"
              }`}>
              {data.status}
            </span>
          </p>
          <p className="mt-1 text-sm text-gray-700">
            <strong>Total Bayar:</strong> Rp{" "}
            {data.total_amount.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <strong>Tanggal Pemesanan:</strong> {data.order_date}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <strong>Tanggal Kedaluwarsa:</strong> {data.expired_date}
          </p>

          <div className="mt-6 border-t border-green-500 pt-4">
            <h3 className="text-lg font-semibold text-black">Item Transaksi</h3>
            <h4 className="text-md text-gray-800 font-medium">
              {data.transaction_items.title}
            </h4>

            <p className="mt-2 text-sm text-gray-700">
              <strong>Deskripsi:</strong>{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: data.transaction_items.description,
                }}
              />
            </p>
            <p className="mt-1 text-sm text-gray-700">
              <strong>Harga:</strong> Rp{" "}
              {data.transaction_items.price.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              <strong>Tanggal Aktivitas:</strong>{" "}
              {data.transaction_items.sport_activities.activity_date} |{" "}
              {data.transaction_items.sport_activities.start_time} -{" "}
              {data.transaction_items.sport_activities.end_time}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              <strong>Lokasi:</strong>{" "}
              <a
                href={data.transaction_items.sport_activities.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline">
                {data.transaction_items.sport_activities.address}
              </a>
            </p>
            <p className="mt-1 text-sm text-gray-700">
              <strong>Bukti Transaksi:</strong>
              <Image
                src={data.transaction_items.sport_activities.image_url}
                alt={data.transaction_items.title}
                width={300}
                height={200}
                className="rounded-lg mt-2 border-2 border-gray-300"
                layout="intrinsic"
              />
            </p>
          </div>

          <div className="mt-6 text-center">
            <a
              href={data.transaction_items.sport_activities.map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-medium hover:underline">
              Lihat Lokasi
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailMyTransaction;

export async function getServerSideProps(context) {
  const param = context.params || { id: "" };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/transaction/${param.id}`,
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
