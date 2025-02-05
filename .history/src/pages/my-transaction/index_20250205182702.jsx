import React, { useState } from "react";
import axios from "axios";
import { Navbar } from "@/components/Features/Navbar";
import { Footer } from "@/components/Features/Footer";
import { useRouter } from "next/router";
import Authorization from "@/components/Authentication/Authorization";

const MyTransaction = ({ transactions }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  return (
    <div>
      <Authorization>
        <Navbar />
        <div className="min-h-screen bg-green-500">
          <div className="min-h-screen flex flex-col justify-between max-w-6xl container mx-auto py-10 px-4">
            <div>
              <h1 className="text-3xl font-bold text-center mb-6 text-black">
                Transaksi Saya
              </h1>
              {currentTransactions.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentTransactions.map((transaction) => (
                      <div
                        key={transaction.invoice_id}
                        onClick={() =>
                          router.push(`/my-transaction/${transaction.id}`)
                        }
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
                  <div className="flex justify-center mt-6 space-x-2">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50">
                      Prev
                    </button>
                    <span className="text-black font-semibold py-2">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50">
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 py-10 bg-white rounded-sm border-2 border-black ">
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
                  <p className="text-center text-sm text-gray-600">
                    Segera lakukan transaksi untuk melihat riwayat transaksi
                    kamu.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </Authorization>
    </div>
  );
};

export default MyTransaction;
export async function getServerSideProps({ req }) {
  const token = req.cookies?.token || "";
  const role = req.cookies?.role;
  const roleId = req.cookies?.roleId;
  let transactions = [];
  let currentPage = 1;
  let lastPage = 1;

  try {
    do {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/all-transaction?page=${currentPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const fetchedTransactions = res.data?.result?.data || [];
      lastPage = res.data?.result?.last_page || 1;
      if (role === "user" && roleId) {
        transactions = transactions.concat(
          fetchedTransactions.filter(
            (transaction) => transaction.user_id == roleId
          )
        );
      } else {
        transactions = transactions.concat(fetchedTransactions);
      }
      currentPage++;
    } while (currentPage <= lastPage);

    return { props: { transactions } };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { props: { transactions: [] } };
  }
}
