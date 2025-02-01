import React from "react";
import { useState, useEffect } from "react";
export const UploadPayment = ({ transactionId }) => {
  const [file, setFile] = useState(null);
  const handleChangeFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        type="file"
        onChange={handleChangeFile}
        name="file"
        value={image}
      />
    </div>
  );
};
