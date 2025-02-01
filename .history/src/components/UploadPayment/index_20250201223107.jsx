import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

export const UploadPayment = ({ transactionId }) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setErrorMessage("Please select a file.");
      return;
    }

    // Validate file type and size (limit 5MB)
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(selectedFile.type)) {
      setErrorMessage("Invalid file type. Please select an image (JPEG, PNG).");
      setFile(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      // 5MB limit
      setErrorMessage(
        "File size is too large. Please upload an image smaller than 5MB."
      );
      setFile(null);
      return;
    }

    setErrorMessage(""); // Clear error if file is valid
    setFile(selectedFile);
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
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
      {/* Error message alert */}
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4 w-full">
          {errorMessage}
        </div>
      )}

      <p className="text-lg mb-4 text-center text-green-700 font-semibold">
        Upload your payment proof (Image file, max 5MB)
      </p>

      <input
        type="file"
        onChange={handleFileChange}
        className="w-full p-3 mb-4 border-2 border-green-400 rounded-md bg-green-50 text-green-700"
      />

      <button
        onClick={handleButtonUpload}
        className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300"
        disabled={!url || !!errorMessage}>
        Upload Payment Proof
      </button>

      {url && (
        <div className="mt-4 text-center text-green-700">
          <p>Image uploaded successfully. Proof URL: </p>
          <a href={url} className="text-blue-600">
            {url}
          </a>
        </div>
      )}
    </div>
  );
};
