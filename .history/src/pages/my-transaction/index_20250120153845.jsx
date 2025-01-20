import React from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useRouter } from "next/router";

const MyTransaction = ({ transactions, page }) => {
  const router = useRouter();

  const handlePagination = (newPage) => {
    router.push(`/my-transaction?page=${newPage}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold text-center mb-6">My Transactions</h1>
        {transactions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold">
                  Invoice: {transaction.invoice_id}
                </h2>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span className="font-medium text-blue-600">
                    {transaction.status}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Total Amount:{" "}
                  <span className="font-medium">
                    Rp{transaction.total_amount}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Order Date: {transaction.order_date}
                </p>
                <p className="text-sm text-gray-600">
                  Expired Date: {transaction.expired_date}
                </p>
                <h3 className="mt-2 text-md font-semibold">
                  Activity:{" "}
                  {transaction.transaction_items.sport_activities.title}
                </h3>
                <img
                  src={transaction.transaction_items.sport_activities.image_url}
                  alt={transaction.transaction_items.sport_activities.title}
                  className="w-full h-40 object-cover rounded-md mt-2"
                />
                <p className="text-sm text-gray-700 mt-2">
                  {transaction.transaction_items.sport_activities.description}
                </p>
                <p className="text-sm text-gray-700">
                  Location:{" "}
                  {transaction.transaction_items.sport_activities.address}
                </p>
                <a
                  href={transaction.transaction_items.sport_activities.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-500 hover:underline">
                  View on Map
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No transactions found.</p>
        )}

        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => handlePagination(page - 1)}>
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">Page {page}</span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
            onClick={() => handlePagination(page + 1)}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyTransaction;

export async function getServerSideProps({ req, query }) {
  const token = req.cookies?.token || "";
  const page = parseInt(query.page) || 1;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/my-transaction?is_paginate=true&per_page=5&page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return { props: { transactions: res.data?.result || [], page } };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { props: { transactions: [], page } };
  }
}
