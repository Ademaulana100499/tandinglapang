import React from "react";
import { useUpdateTransaction } from "@/hooks/useUpdateTransaction";

export const UpdateTransaction = ({ transactionId }) => {
  const { updateTransactionStatus, loading } =
    useUpdateTransaction(transactionId);

  return (
    <button
      onClick={updateTransactionStatus}
      className="bg-green-500 px-4 py-2 text-white rounded"
      disabled={loading}>
      {loading ? "Updating..." : "Update"}
    </button>
  );
};
