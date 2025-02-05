import React from "react";
import { useUploadPayment } from "@/hooks/useUploadPayment";

export const UploadPayment = ({ transactionId }) => {
  const { handleFileChange, updateProofPayment, errorMessage, url } =
    useUploadPayment(transactionId);

  return (
    <div className="mt-4 text-sm">
      {errorMessage && (
        <span className="mb-2 text-red-500">{errorMessage}</span>
      )}
      <p className="text-green-700 mb-2">
        Unggah bukti transfer sebelum tanggal kedaluwarsa <br /> (Gambar,
        maksimal 512KB)
      </p>
      <div className="flex ">
        <input
          type="file"
          onChange={handleFileChange}
          className="p-1  border border-gray-300"
        />
        <button
          onClick={updateProofPayment}
          className="px-3 py-2 bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300"
          disabled={!url || !!errorMessage}>
          Unggah
        </button>
      </div>
    </div>
  );
};
