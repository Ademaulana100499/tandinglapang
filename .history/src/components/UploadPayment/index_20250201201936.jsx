import React from "react";
import { useState, useEffect } from "react";
export const UploadPayment = ({ transactionId }) => {
  const [file, setFile] = useState(null);
  const handleChangeFile = (event) => {
    setFile(event.target.files[0]);
  };
  return (
    <div>
      <input type="file" onChange={handleChangeFile} name="file" />
    </div>
  );
};
