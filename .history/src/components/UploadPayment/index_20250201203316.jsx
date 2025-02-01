import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
export const UploadPayment = ({ transactionId }) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const handleChangeFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      setUrl(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);
  return (
    <div>
      <input type="file" onChange={handleChangeFile} name="file" />
    </div>
  );
};
