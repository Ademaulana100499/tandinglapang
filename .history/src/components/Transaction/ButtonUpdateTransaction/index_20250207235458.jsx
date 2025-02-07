import React from "react";
import { useUpdateTransaction } from "@/hooks/useUpdateTransaction";

export const UpdateTransaction = ({ transactionId, fetchData }) => {
  const { updateTransactionStatus, loading } = useUpdateTransaction(
    transactionId,
    fetchData
  );

  return (
    <button
      onClick={updateTransactionStatus}
      className="bg-green-500 w-52 py-2 hover:bg-green-600 text-white rounded"
      disabled={loading}>
      {loading ? "Updating..." : "Konfirmasi Transaksi"}
    </button>
  );
};
