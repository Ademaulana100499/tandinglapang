import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";

const DetailMyTransaction = ({ data }) => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data.transaction_items.sport_activities.description) {
      setDescription(data.transaction_items.sport_activities.description);
    }
    setIsLoading(false);
  }, [data.transaction_items.sport_activities.description]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <div>Data not found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          Transaction Detail
        </h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Invoice: {data.invoice_id}</h2>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
          <p>
            <strong>Total Amount:</strong> Rp{" "}
            {data.total_amount.toLocaleString()}
          </p>
          <p>
            <strong>Order Date:</strong> {data.order_date}
          </p>
          <p>
            <strong>Expired Date:</strong> {data.expired_date}
          </p>

          <div className="mt-4">
            <h3 className="font-semibold">Transaction Item</h3>
            <h4>{data.transaction_items.title}</h4>
            <Image
              src={data.transaction_items.sport_activities.image_url}
              alt={data.transaction_items.title}
              width={500}
              height={300}
              className="rounded-lg mt-2"
              layout="intrinsic"
            />
            <p>
              <strong>Description:</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: description }} />
            </p>
            <p>
              <strong>Fee:</strong> Rp{" "}
              {data.transaction_items.price.toLocaleString()}
            </p>
            <p>
              <strong>Discounted Fee:</strong> Rp{" "}
              {data.transaction_items.price_discount.toLocaleString()}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              <a
                href={data.transaction_items.sport_activities.map_url}
                target="_blank"
                rel="noopener noreferrer">
                {data.transaction_items.sport_activities.address}
              </a>
            </p>
            <p>
              <strong>Activity Date:</strong>{" "}
              {data.transaction_items.sport_activities.activity_date} |{" "}
              {data.transaction_items.sport_activities.start_time} -{" "}
              {data.transaction_items.sport_activities.end_time}
            </p>
          </div>

          <div className="mt-4">
            <a
              href={data.proof_payment_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500">
              View Payment Proof
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailMyTransaction;

export async function getServerSideProps(context) {
  const param = context.params || { id: "" };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/transaction/${param.id}`,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies.token}`,
        },
      }
    );
    return { props: { data: res.data.result || {} } };
  } catch (error) {
    console.error("Error fetching activity details:", error);
    return { props: { data: {} } };
  }
}
