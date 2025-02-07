import React from "react";
import { useCancelTransaction } from "@/hooks/useCancelTransaction";
import { BarLoader } from "@/components/Features/Loading";

export const CancelTransaction = ({ transactionId, fetchData }) => {
  const { handleCancel, loading } = useCancelTransaction(
    transactionId,
    fetchData
  );

  return (
    <div>
      <button
        onClick={handleCancel}
        className="bg-red-500 w-52 py-2 hover:bg-red-600 text-white rounded"
        disabled={loading}>
        {loading ? (
          <span>
            <BarLoader />
          </span>
        ) : (
          "Batalkan Transaksi"
        )}
      </button>
    </div>
  );
};
