import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import DetailTransaction from "./id";
const AllSportCategorys = () => {
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

export default AllSportCategorys;
