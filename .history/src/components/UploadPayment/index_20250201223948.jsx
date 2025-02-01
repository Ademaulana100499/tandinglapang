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
      setErrorMessage("Please select a file.");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(selectedFile.type)) {
      setErrorMessage("Invalid file type. Please select an image.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 512 * 1024) {
      setErrorMessage(
        "File size is too large. Please upload an image smaller than 512KB."
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
      console.error("Error uploading file:", err);
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
      console.log("Payment proof uploaded:", response);
    } catch (err) {
      console.error("Error updating payment proof:", err);
    }
  };

  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      {errorMessage && (
        <div className="bg-red-200 text-red-700 p-3 mb-4 w-full rounded-md">
          {errorMessage}
        </div>
      )}
      <p className="text-lg mb-4 text-center text-green-700">
        Upload your payment proof (Image file, max 512KB)
      </p>
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full p-2 mb-4 border rounded-md border-gray-300"
      />
      <button
        onClick={handleButtonUpload}
        className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300"
        disabled={!url || !!errorMessage}>
        Upload Payment Proof
      </button>
    </div>
  );
};
