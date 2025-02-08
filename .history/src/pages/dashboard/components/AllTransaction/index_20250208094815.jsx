import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import DetailTransaction from "./id";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getCookie("token");
      if (!token) throw new Error("Token tidak ditemukan, harap login ulang.");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/all-transaction`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTransactions(response.data?.result?.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [refresh]);

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-screen container mx-auto p-5">
      {loading ? (
        <p className="text-center text-black font-semibold">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : transactions.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {transactions.map((transaction) => (
              <div
                key={transaction.invoice_id}
                onClick={() => setSelectedTransaction(transaction)}
                className="bg-white shadow-lg p-6 transition transform hover:scale-105 cursor-pointer border-2 border-gray-400 hover:border-black">
                <h2 className="text-xl font-semibold text-black">
                  Invoice: {transaction.invoice_id}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Status:{" "}
                  <span className="font-medium text-black">
                    {transaction.status}
                  </span>
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Total Pembayaran:{" "}
                  <span className="font-medium text-black">
                    Rp.{transaction.total_amount}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Tanggal Pemesanan: {transaction.order_date}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Tanggal Kedaluwarsa: {transaction.expired_date}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 py-10 bg-white rounded-sm border-2 border-black">
          <p className="text-center text-lg font-semibold text-black">
            Belum ada transaksi.
          </p>
        </div>
      )}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <DetailTransaction
            id={selectedTransaction.id}
            setSelectedTransaction={() => {
              setSelectedTransaction(null);
              setRefresh((prev) => !prev);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AllTransactions;
