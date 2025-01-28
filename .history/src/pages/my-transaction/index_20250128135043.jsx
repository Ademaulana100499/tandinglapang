import React from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useRouter } from "next/router";

const MyTransaction = ({ transactions, page, lastPage }) => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col justify-between container mx-auto py-10 px-4">
      <div>
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
          My Transactions
        </h1>
        {transactions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactions.map((transaction) => (
              <div
                key={transaction.invoice_id}
                onClick={() => router.push(`/my-transaction/${transaction.id}`)}
                className="bg-white shadow-lg rounded-xl p-6 transition transform hover:scale-105 cursor-pointer border-2 border-gray-200 hover:border-green-500">
                <h2 className="text-xl font-semibold text-black">
                  Invoice: {transaction.invoice_id}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      transaction.status === "Pending"
                        ? "text-blue-500"
                        : "text-green-600"
                    }`}>
                    {transaction.status}
                  </span>
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Total Amount:{" "}
                  <span className="font-medium text-black">
                    Rp{transaction.total_amount}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Order Date: {transaction.order_date}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Expired Date: {transaction.expired_date}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No transactions found.</p>
        )}
      </div>
      <div className="text-center mt-6 text-gray-700">
        {page > 1 && (
          <a
            href={`/my-transaction?page=${page - 1}`}
            className="text-green-500 hover:underline mr-4">
            &laquo; Previous
          </a>
        )}
        <span className="text-black font-medium">
          Page {page} of {lastPage}
        </span>
        {page < lastPage && (
          <a
            href={`/my-transaction?page=${page + 1}`}
            className="text-green-500 hover:underline ml-4">
            Next &raquo;
          </a>
        )}
      </div>
    </div>
  );
};

export default MyTransaction;

export async function getServerSideProps({ req, query }) {
  const token = req.cookies?.token || "";
  const page = parseInt(query.page) || 1;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/my-transaction?page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const transactions = res.data?.result?.data || [];
    const currentPage = res.data?.result?.current_page || 1;
    const lastPage = res.data?.result?.last_page || 1;

    return { props: { transactions, page: currentPage, lastPage } };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { props: { transactions: [], page: 1, lastPage: 1 } };
  }
}
