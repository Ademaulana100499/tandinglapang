import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "@/components/Features/Navbar";
import { Footer } from "@/components/Features/Footer";
import Image from "next/image";
import { CancelTransaction } from "@/components/Transaction/ButtonCancelTransaction";
import { UploadPayment } from "@/components/Transaction/UploadPayment";
import { IoClose } from "react-icons/io5";
import { UpdateTransaction } from "@/components/Transaction/ButtonUpdateTransaction";
import Authorization from "@/components/Authentication/Authorization";
import { useRouter } from "next/router";

const DetailTransaction = ({ role }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/transaction/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(res.data.result);
      } catch (error) {
        console.error("Error fetching transaction details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleImageClick = (url) => {
    setImageUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImageUrl("");
  };

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Data not found</div>;

  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "success";

  return (
    <div>
      <Authorization>
        <Navbar />
        <div className="bg-green-500">
          <div className="min-h-screen max-w-6xl flex flex-col items-center container mx-auto pb-10 pt-5 px-4">
            <h1 className="text-3xl font-bold text-center mb-6 text-black">
              Detail Transaksi
            </h1>

            <div className="bg-white shadow-lg p-6 w-full border-2 border-black mx-auto">
              <h2 className="text-xl font-semibold text-black">
                Invoice: {data.invoice_id}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                <strong>Status:</strong>{" "}
                <span
                  className={`font-medium ${
                    data.status === "pending"
                      ? "text-blue-500"
                      : data.status === "cancelled"
                      ? "text-red-500"
                      : "text-green-600"
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

              <div className="mt-6 border-t mb-2 border-black pt-4">
                <h3 className="text-lg font-semibold text-black">
                  Item Transaksi
                </h3>
                <h4 className="text-md text-gray-800 font-medium">
                  {data.transaction_items.title}
                </h4>
                <p className="mt-2 text-sm text-gray-700">
                  <strong>Deskripsi:</strong>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        data.transaction_items.sport_activities?.description ||
                        "-",
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
                    className="text-gray-700 hover:underline">
                    {data.transaction_items.sport_activities.address}
                  </a>
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  <a
                    href={data.transaction_items.sport_activities.map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 font-medium hover:underline">
                    Lihat Lokasi
                  </a>
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  <strong>Bukti Transfer:</strong>
                  {data.proof_payment_url ? (
                    <div
                      onClick={() => handleImageClick(data.proof_payment_url)}
                      className="cursor-pointer">
                      <Image
                        src={data.proof_payment_url}
                        alt={data.transaction_items?.title || "Bukti Transfer"}
                        width={300}
                        height={200}
                        className="rounded-lg mt-1 border-2 border-gray-300"
                        layout="intrinsic"
                      />
                    </div>
                  ) : (
                    <span className="text-red-500 mt-1 mb-2 block">
                      Belum ada bukti transfer
                    </span>
                  )}
                </p>
              </div>
              <UpdateTransaction transactionId={data.id} />
              <CancelTransaction transactionId={data.id} />
            </div>
          </div>
        </div>
        <Footer />
      </Authorization>
    </div>
  );
};

export default DetailTransaction;
