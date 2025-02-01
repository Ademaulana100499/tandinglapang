import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { UploadPayment } from "@/components/UploadPayment";
import { MdClose } from "react-icons/md";

const DetailMyTransaction = ({ data }) => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (data?.transaction_items?.sport_activities?.description) {
      setDescription(data.transaction_items.sport_activities.description);
    }
    setIsLoading(false);
  }, [data]);

  const handleImageClick = (url) => {
    setImageUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImageUrl("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <div>Data not found</div>;
  }

  return (
    <div className="bg-green-500">
      <Navbar />
      <div className="min-h-screen flex flex-col items-center container mx-auto pb-10 pt-5 px-4">
        <div className="w-full max-w-3xl flex justify-between items-center mb-2">
          <Link
            href="/my-transaction"
            className="text-black text-lg font-semibold ">
            Transaksi Saya
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Detail Transaksi
        </h1>

        <div className="bg-white shadow-lg p-6 w-full max-w-3xl border-2 border-black mx-auto">
          <h2 className="text-xl font-semibold text-black">
            Invoice: {data.invoice_id}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            <strong>Status:</strong>{" "}
            <span
              className={`font-medium ${
                data.status === "pending" ? "text-blue-500" : "text-green-600"
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

          <div className="mt-6 border-t border-black pt-4">
            <h3 className="text-lg font-semibold text-black">Item Transaksi</h3>
            <h4 className="text-md text-gray-800 font-medium">
              {data.transaction_items.title}
            </h4>
            <p className="mt-2 text-sm text-gray-700">
              <strong>Deskripsi:</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: description }} />
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
              {data.proof_payment_url ? (
                <div
                  onClick={() => handleImageClick(data.proof_payment_url)}
                  className="cursor-pointer">
                  <Image
                    src={data.proof_payment_url}
                    alt={data.transaction_items?.title || "Bukti transaksi"}
                    width={300}
                    height={200}
                    className="rounded-lg mt-2 border-2 border-gray-300"
                    layout="intrinsic"
                  />
                </div>
              ) : (
                <span className="text-red-500 mt-2 block">
                  Belum ada bukti pembayaran
                </span>
              )}
            </p>
            <UploadPayment transactionId={data.id} />
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg max-w-4xl w-full shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-3xl text-gray-700 hover:text-black transition duration-300">
              &times;
            </button>
            <img
              src={imageUrl}
              alt="Bukti Pembayaran"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-md"
            />
          </div>
        </div>
      )}
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
