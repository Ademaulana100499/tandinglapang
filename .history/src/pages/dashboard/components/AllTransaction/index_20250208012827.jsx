import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import DetailTransaction from "./id";

const AllTransactions = () => {
  const [allTransactions, setAllTransactions] = useState([]); // Semua transaksi
  const [transactions, setTransactions] = useState([]); // Transaksi per halaman
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
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

        console.log("🔍 API Response:", response.data);

        const allData = response.data?.result?.data || [];
        console.log("✅ Data sebelum sorting:", allData);

        // Urutkan berdasarkan status (pending > success > cancelled)
        const sortedData = [...allData].sort((a, b) => {
          const order = { pending: 1, success: 2, cancelled: 3 };
          return order[a.status] - order[b.status];
        });

        console.log("✅ Data setelah sorting:", sortedData);

        setAllTransactions(sortedData); // Simpan semua transaksi yang sudah diurutkan
      } catch (error) {
        console.error("🚨 Error fetching transactions:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    if (allTransactions.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = allTransactions.slice(startIndex, endIndex);

      console.log(`🔄 Data untuk halaman ${currentPage}:`, paginatedData);
      setTransactions(paginatedData);
    }
  }, [currentPage, allTransactions]);

  const totalPages = Math.ceil(allTransactions.length / itemsPerPage);

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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="text-black hover:underline disabled:opacity-50">
                &laquo; Sebelumnya
              </button>
              <span className="text-black font-semibold py-2">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="text-black hover:underline disabled:opacity-50">
                Selanjutnya &raquo;
              </button>
            </div>
          )}
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
            setSelectedTransaction={setSelectedTransaction}
          />
        </div>
      )}
    </div>
  );
};

export default AllTransactions;
