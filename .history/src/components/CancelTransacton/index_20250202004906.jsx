import React from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
export const CancelTransacton = () => {
  const handleCancel = () => {
    try {
      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/cancel/${transactionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
    } catch (err) {
      console.error(
        "Terjadi kesalahan saat memperbarui bukti pembayaran:",
        err
      );
    }
  };
  return (
    <div>
      <button onClick={handleCancel} className="bg-red-500 ">
        Cancel
      </button>
    </div>
  );
};
