import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
export const UploadPayment = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:5000/api/v1/payment/upload", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input type="file" />
    </div>
  );
};
