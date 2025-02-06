import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

const Detailactivity = ({ setSelectedactivity, id }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    console.log("Fetching data for activity ID:", id);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/activity/${id}`,
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );
        setData(res.data.result);
      } catch (error) {
        console.error("Error fetching activity details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Data not found</div>;

  return (
    <div className=" max-w-5xl flex flex-col items-center container mx-auto pb-10 pt-5 px-4">
      <div className="bg-white shadow-lg p-6 w-full border-2 border-black mx-auto">
        <h2 className="text-xl font-semibold text-black">
          Invoice: {data.invoice_id}
        </h2>
        <p
          className={`text-sm font-medium mt-2 ${
            data.status === "pending"
              ? "text-blue-500"
              : data.status === "cancelled"
              ? "text-red-500"
              : "text-green-600"
          }`}>
          <strong>Status:</strong> {data.status}
        </p>
        <p className="text-sm mt-1">
          <strong>Total Bayar:</strong> Rp {data.total_amount?.toLocaleString()}
        </p>
        <p className="text-sm mt-1">
          <strong>Tanggal Pemesanan:</strong> {data.order_date}
        </p>
        <p className="text-sm mt-1">
          <strong>Tanggal Kedaluwarsa:</strong> {data.expired_date}
        </p>
        <div className="mt-6 border-t mb-2 border-black pt-4">
          <h3 className="text-lg font-semibold">Item Transaksi</h3>
          <h4 className="text-md font-medium">{data.activity_items?.title}</h4>
          <p className="text-sm mt-2">
            <strong>Deskripsi:</strong>{" "}
            <span
              dangerouslySetInnerHTML={{
                __html:
                  data.activity_items?.sport_activities?.description || "-",
              }}
            />
          </p>
          <p className="text-sm mt-1">
            <strong>Harga:</strong> Rp{" "}
            {data.activity_items?.price?.toLocaleString()}
          </p>
          <p className="text-sm mt-1">
            <strong>Tanggal Aktivitas:</strong>{" "}
            {data.activity_items?.sport_activities?.activity_date} |{" "}
            {data.activity_items?.sport_activities?.start_time} -{" "}
            {data.activity_items?.sport_activities?.end_time}
          </p>
          <p className="text-sm mt-1">
            <strong>Lokasi:</strong>{" "}
            <a
              href={data.activity_items?.sport_activities?.map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline">
              {data.activity_items?.sport_activities?.address}
            </a>
          </p>
          <p className="text-sm mt-1"></p>
        </div>
        <button
          onClick={() => setSelectedactivity(null)}
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
          Tutup
        </button>
      </div>
    </div>
  );
};

export default Detailactivity;
