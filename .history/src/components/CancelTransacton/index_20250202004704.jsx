import React from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
export const CancelTransacton = () => {
  const handleCancel = () => {
    try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/transaction/update-proof-payment/${transactionId}`,
          { proof_payment_url: url },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );
        console.log("Bukti pembayaran berhasil diunggah:", response);
        window.location.reload();
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
