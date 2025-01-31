import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

const DetailMyTransaction = ({ data }) => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (data.transaction_items.sport_activities.description) {
      setDescription(data.transaction_items.sport_activities.description);
    }
    setIsLoading(false);
  }, [data.transaction_items.sport_activities.description]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Pilih gambar terlebih dahulu");

    setUploading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const uploadResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = uploadResponse.data.image_url;

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/update-proof-payment/${data.id}`,
        { proof_payment_url: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${document.cookie.replace("token=", "")}`,
          },
        }
      );

      alert("Bukti pembayaran berhasil diunggah!");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Gagal mengunggah gambar");
    }
    setUploading(false);
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
            className="text-black text-lg font-semibold">
            Kembali
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
              <span
                dangerouslySetInnerHTML={{
                  __html: data.transaction_items.sport_activities.description,
                }}
              />
            </p>
            <p className="mt-1 text-sm text-gray-700">
              <strong>Harga:</strong> Rp{" "}
              {data.transaction_items.price.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              <strong>Bukti Transaksi:</strong>
              {data.proof_payment_url ? (
                <Image
                  src={data.proof_payment_url}
                  alt={data.transaction_items?.title || "Bukti transaksi"}
                  width={300}
                  height={200}
                  className="rounded-lg mt-2 border-2 border-gray-300"
                  layout="intrinsic"
                />
              ) : (
                <div className="mt-2">
                  <span className="text-red-500 block">
                    Belum ada bukti pembayaran
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-2"
                  />
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50">
                    {uploading ? "Mengunggah..." : "Unggah Bukti Pembayaran"}
                  </button>
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailMyTransaction;
