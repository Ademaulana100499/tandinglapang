import React from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const MyTransaction = ({ transactions, page }) => {
  return (
    <div>
      <Navbar />
      <div>
        <h1>My Transactions</h1>
        {transactions.length > 0 ? (
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <h2>Invoice: {transaction.invoice_id}</h2>
                <p>Status: {transaction.status}</p>
                <p>Total Amount: Rp{transaction.total_amount}</p>
                <p>Order Date: {transaction.order_date}</p>
                <p>Expired Date: {transaction.expired_date}</p>
                <h3>
                  Activity:{" "}
                  {transaction.transaction_items.sport_activities.title}
                </h3>
                <img
                  src={transaction.transaction_items.sport_activities.image_url}
                  alt={transaction.transaction_items.sport_activities.title}
                  width="200"
                />
                <p>
                  {transaction.transaction_items.sport_activities.description}
                </p>
                <p>
                  Location:{" "}
                  {transaction.transaction_items.sport_activities.address}
                </p>
                <a
                  href={transaction.transaction_items.sport_activities.map_url}
                  target="_blank"
                  rel="noopener noreferrer">
                  View on Map
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions found.</p>
        )}
        <p>Current Page: {page}</p>
      </div>
      <Footer />
    </div>
  );
};

export default MyTransaction;

export async function getServerSideProps({ req, query }) {
  const token = req.cookies?.token || "";
  const page = query.page || 1;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/my-transaction?is_paginate=false&per_page=5&page=${page}`,
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
