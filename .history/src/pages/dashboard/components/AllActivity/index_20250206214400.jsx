import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

const AllActivities = () => {
  const [activities, setActivities] = useState([]);
  const [totalActivities, setTotalActivities] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getCookie("token");
        if (!token) {
          throw new Error("Token tidak ditemukan, harap login ulang.");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sport-activities?page=${currentPage}&per_page=${itemsPerPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response);

        setActivities(response.data?.result?.data || []);
        setTotalActivities(response.data?.total || 0);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [currentPage]);

  const totalPages = Math.ceil(totalActivities / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-screen container mx-auto p-5">
      {loading ? (
        <p className="text-center text-black font-semibold">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : activities.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white shadow-lg p-6 transition transform hover:scale-105 cursor-pointer border-2 border-gray-400 hover:border-black">
                <h2 className="text-xl font-semibold text-black">
                  {activity.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Kategori:{" "}
                  <span className="font-medium text-black">
                    {activity.sport_category.name}
                  </span>
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Harga:{" "}
                  <span className="font-medium text-black">
                    Rp.{activity.price}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Slot: {activity.slot}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Lokasi: {activity.address}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Tanggal: {activity.activity_date} | {activity.start_time} -{" "}
                  {activity.end_time}
                </p>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="text-black hover:underline disabled:opacity-50">
                &laquo; Sebelumnya
              </button>
              <span className="text-black font-semibold py-2">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="text-black hover:underline disabled:opacity-50">
                Selanjutnya &raquo;
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 py-10 bg-white rounded-sm border-2 border-black">
          <p className="text-center text-lg font-semibold text-black">
            Belum ada aktivitas olahraga.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllActivities;
