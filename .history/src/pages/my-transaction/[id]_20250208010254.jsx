import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "@/components/Features/Navbar";
import { Footer } from "@/components/Features/Footer";
import Image from "next/image";
import { CancelTransaction } from "@/components/Transaction/ButtonCancelTransaction";
import { UploadPayment } from "@/components/Transaction/UploadPayment";
import { IoClose } from "react-icons/io5";
import Authorization from "@/components/Authentication/Authorization";
import useTransactionDetail from "@/hooks/useDetailTransaction";
import { useRole } from "@/context/RoleContext";

const DetailMyTransaction = () => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { handleImageClick, data, closeModal, isModalOpen, fetchData } =
    useTransactionDetail(id);
  const role = useRole();

  useEffect(() => {
    if (data?.transaction_items?.sport_activities?.description) {
      setDescription(data.transaction_items.sport_activities.description);
    }
    setIsLoading(false);
  }, [data]);

  const handleCancel = () => {
    if (data?.id) {
      fetchData();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) return <div>Data not found</div>;

  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "success";

  return (
    <div>
      <Authorization>
        <Navbar />
        <div className="bg-green-500 ">
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
                    className="text-gray-700 hover:underline">
                    {data.transaction_items.sport_activities.address}
                  </a>
                </p>

                {data.proof_payment_url && (
                  <p className="mt-1 text-sm text-gray-700">
                    <strong>Bukti Transfer:</strong>
                    <div
                      onClick={() => handleImageClick(data.proof_payment_url)}
                      className="cursor-pointer">
                      <Image
                        src={data.proof_payment_url}
                        alt="Bukti Transfer"
                        width={200}
                        height={100}
                      />
                    </div>
                  </p>
                )}
              </div>

              {isCancelled && <CancelTransaction onCancel={handleCancel} />}

              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-lg">
                    <button
                      onClick={closeModal}
                      className="absolute top-0 right-0 p-2 text-black">
                      <IoClose />
                    </button>
                    <Image
                      src={data.proof_payment_url}
                      alt="Bukti Transfer"
                      width={400}
                      height={300}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </Authorization>
    </div>
  );
};

export default DetailMyTransaction;
