import React from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
export const CancelTransacton = ({ transactionId }) => {
  const router = useRouter();
  const handleCancel = async () => {
    const confirmResult = await Swal.fire({
      title: "Transaksi dibatalkan!",
      icon: "warning",
      text: "Apakah Kamu yakin untuk melakukan pembatalan ini?",
      showCancelButton: true,
      confirmButtonColor: "#31c360",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Lanjutkan!",
      cancelButtonText: "Batal",
    });
    if (!confirmResult.isConfirmed) {
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/cancel/${transactionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      Swal.fire({
        title: "Transaksi dibatalkan!",
        icon: "success",
        confirmButtonColor: "#31c360",
      });
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
