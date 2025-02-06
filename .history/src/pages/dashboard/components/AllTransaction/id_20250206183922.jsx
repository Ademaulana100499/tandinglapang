import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { CancelTransaction } from "@/components/Transaction/ButtonCancelTransaction";
import { IoClose } from "react-icons/io5";
import { UpdateTransaction } from "@/components/Transaction/ButtonUpdateTransaction";

const DetailTransaction = ({ id: propId }) => {
  const router = useRouter();
  const id = propId || router.query.id;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/transaction/${id}`,
          {
            headers: {
              Authorization: `Bearer ${document.cookie}`,
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

  return (
    <div className="bg-green-500 min-h-screen flex flex-col items-center container mx-auto pb-10 pt-5 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Detail Transaksi
      </h1>
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
          <h4 className="text-md font-medium">
            {data.transaction_items?.title}
          </h4>
          <p className="text-sm mt-2">
            <strong>Deskripsi:</strong>{" "}
            <span
              dangerouslySetInnerHTML={{
                __html:
                  data.transaction_items?.sport_activities?.description || "-",
              }}
            />
          </p>
          <p className="text-sm mt-1">
            <strong>Harga:</strong> Rp{" "}
            {data.transaction_items?.price?.toLocaleString()}
          </p>
          <p className="text-sm mt-1">
            <strong>Tanggal Aktivitas:</strong>{" "}
            {data.transaction_items?.sport_activities?.activity_date} |{" "}
            {data.transaction_items?.sport_activities?.start_time} -{" "}
            {data.transaction_items?.sport_activities?.end_time}
          </p>
          <p className="text-sm mt-1">
            <strong>Lokasi:</strong>{" "}
            <a
              href={data.transaction_items?.sport_activities?.map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline">
              {data.transaction_items?.sport_activities?.address}
            </a>
          </p>
          <p className="text-sm mt-1">
            <strong>Bukti Transfer:</strong>
            {data.proof_payment_url ? (
              <div
                onClick={() => handleImageClick(data.proof_payment_url)}
                className="cursor-pointer">
                <Image
                  src={data.proof_payment_url}
                  alt="Bukti Transfer"
                  width={300}
                  height={200}
                  className="rounded-lg mt-1 border-2 border-gray-300"
                  layout="intrinsic"
                  unoptimized
                />
              </div>
            ) : (
              <span className="text-red-500">Belum ada bukti transfer</span>
            )}
          </p>
        </div>
        <UpdateTransaction transactionId={data.id} />
        <CancelTransaction transactionId={data.id} />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 max-w-4xl w-full shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-1 right-1 text-3xl text-gray-700 hover:text-black">
              <IoClose />
            </button>
            <img
              src={imageUrl}
              alt="Bukti Transfer"
              className="w-full h-auto max-h-[80vh] object-contain shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailTransaction;
