import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

export const UploadPayment = ({ transactionId }) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setErrorMessage("Harap pilih file terlebih dahulu.");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(selectedFile.type)) {
      setErrorMessage("Tipe file tidak valid. Harap pilih gambar.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 512 * 1024) {
      setErrorMessage(
        "Ukuran file terlalu besar. Harap unggah gambar dengan ukuran maksimal 512KB."
      );
      setFile(null);
      return;
    }

    setErrorMessage("");
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload-image`,
        formData
      );
      setUrl(response.data.result);
    } catch (err) {
      console.error("Terjadi kesalahan saat mengunggah file:", err);
    }
  };

  const handleButtonUpload = async () => {
    if (!url) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/update-proof-payment/${transactionId}`,
        { proof_payment_url: url },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      console.log("Bukti pembayaran berhasil diunggah:", response);
      window.location.reload();
    } catch (err) {
      console.error(
        "Terjadi kesalahan saat memperbarui bukti pembayaran:",
        err
      );
    }
  };

  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  return (
    <div className="mt-4 text-sm">
      {errorMessage && (
        <div className="bg-red-200 mb-2 text-red-700">{errorMessage}</div>
      )}
      <p className="text-green-700 mb-2">
        Unggah bukti transfer sebelum tanggal kedaluwarsa <br /> (Gambar,
        maksimal 512KB)
      </p>
      <input
        type="file"
        onChange={handleFileChange}
        className="p-2 mb-4 border border-gray-300"
      />
      <button
        onClick={handleButtonUpload}
        className="p-3 bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300"
        disabled={!url || !!errorMessage}>
        Unggah
      </button>
    </div>
  );
};
