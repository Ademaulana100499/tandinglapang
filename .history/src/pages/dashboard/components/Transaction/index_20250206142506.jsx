import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

const Transactions = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchTransactions = async () => {
      setError(null);
      try {
        const token = getCookie("token");
        if (!token) {
          throw new Error("Token tidak ditemukan, harap login ulang.");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/all-transaction`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTransactions(response.data?.result || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = Array.isArray(transactions)
    ? transactions.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-green-500 flex flex-col justify-between max-w-6xl container mx-auto py-10 px-4">
      {loading ? (
        <p className="text-center text-white font-semibold">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : currentTransactions.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTransactions.map((transaction) => (
              <div
                key={transaction.invoice_id}
                onClick={() => router.push(`/transaction/${transaction.id}`)}
                className="bg-white shadow-lg p-6 transition transform hover:scale-105 cursor-pointer border-2 border-gray-400 hover:border-black">
                <h2 className="text-xl font-semibold text-black">
                  Invoice: {transaction.invoice_id}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      transaction.status === "pending"
                        ? "text-blue-500"
                        : transaction.status === "cancelled"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}>
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
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-white hover:underline disabled:opacity-50">
                &laquo; Sebelumnya
              </button>
              <span className="text-white font-semibold py-2">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-white hover:underline disabled:opacity-50">
                Selanjutnya &raquo;
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 py-10 bg-white rounded-sm border-2 border-black">
          <svg
            className="w-16 h-16 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 13l3 3l3-3M12 10v6"
            />
          </svg>
          <p className="text-center text-lg font-semibold text-black">
            Belum ada transaksi.
          </p>
        </div>
      )}
    </div>
  );
};

export default Transactions;
