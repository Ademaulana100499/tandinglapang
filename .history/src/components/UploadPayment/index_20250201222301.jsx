import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

export const UploadPayment = ({ transactionId }) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload file to server
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

  // Upload payment proof after the image is uploaded
  const handleButtonUpload = async () => {
    if (!url) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/update-proof-payment/${transactionId}`,
        {
          proof_payment_url: url,
        },
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
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleButtonUpload}>Upload Payment Proof</button>
    </div>
  );
};
