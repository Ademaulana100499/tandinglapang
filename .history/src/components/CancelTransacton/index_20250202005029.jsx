import React from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
export const CancelTransacton = () => {
  const router = useRouter();
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
      router.push("/my-transaction");
    } catch (err) {
      console.log(err);
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
