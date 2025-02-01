import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
export const UploadPayment = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/upload-image`, formData)
      .then((res) => {
        console.log(res);
        setUrl(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <p>{url}</p>
    </div>
  );
};
