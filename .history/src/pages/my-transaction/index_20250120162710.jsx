import React from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const MyTransaction = ({ transactions, page, lastPage }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold text-center mb-6">My Transactions</h1>
        {transactions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactions.map((transaction) => (
              <div
                key={transaction.invoice_id}
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
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No transactions found.</p>
        )}
        <div className="text-center mt-6 text-gray-700">
          {page > 1 && (
            <a
              href={`/my-transaction?page=${page - 1}`}
              className="text-blue-500 hover:underline mr-4">
              &laquo; Previous
            </a>
          )}
          <span>
            Page {page} of {lastPage}
          </span>
          {page < lastPage && (
            <a
              href={`/my-transaction?page=${page + 1}`}
              className="text-blue-500 hover:underline ml-4">
              Next &raquo;
            </a>
          )}
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
