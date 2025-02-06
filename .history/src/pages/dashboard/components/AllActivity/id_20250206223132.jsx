import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { EditActivityModal } from "@/components/Activity/EditActivityModal";
const DetailActivity = ({ setSelectedActivity, id }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  useEffect(() => {
    if (!id) return;
    console.log("Fetching data for activity ID:", id);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sport-activities/${id}`,
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
    <div className="max-w-5xl flex flex-col items-center container mx-auto pb-10 pt-5 px-4">
      <div className="bg-white shadow-lg p-6 w-full border-2 border-black mx-auto">
        <h2 className="text-xl font-semibold text-black">{data.title}</h2>
        <p className="text-sm font-medium mt-2">
          <strong>Kategori:</strong> {data.sport_category?.name}
        </p>
        <p className="text-sm mt-1">
          <strong>Harga:</strong> Rp {data.price?.toLocaleString()}
        </p>
        <p className="text-sm mt-1">
          <strong>Slot Tersedia:</strong> {data.slot}
        </p>
        <p className="text-sm mt-1">
          <strong>Tanggal Aktivitas:</strong> {data.activity_date}
        </p>
        <p className="text-sm mt-1">
          <strong>Waktu:</strong> {data.start_time} - {data.end_time}
        </p>
        <p className="text-sm mt-1">
          <strong>Lokasi:</strong> {data.address}
        </p>
        <p className="text-sm mt-1">
          <strong>Penyelenggara:</strong> {data.organizer?.name}
        </p>
        <p className="text-sm mt-1">
          <strong>Kota:</strong> {data.city?.city_name_full},{" "}
          {data.city?.province?.province_name}
        </p>
        <div className="mt-6 border-t mb-2 border-black pt-4">
          <h3 className="text-lg font-semibold">Peserta</h3>
          {data.participants && data.participants.length > 0 ? (
            <ul className="list-disc pl-5">
              {data.participants.map((participant) => (
                <li key={participant.id}>{participant.user.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm">Belum ada peserta</p>
          )}
        </div>
        <button
          onClick={() => setIsEditOpen(true)}
          className="mt-4  bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-100">
          Edit
        </button>
        <button
          onClick={() => setSelectedActivity(null)}
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
          Tutup
        </button>
      </div>
      <EditActivityModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        activityData={data}
      />
    </div>
  );
};

export default DetailActivity;
