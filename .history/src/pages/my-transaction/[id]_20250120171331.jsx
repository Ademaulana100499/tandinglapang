import React from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
const detailMyTransaction = ({ data }) => {
  console.log(data);
  return (
    <div>
      <Navbar />
      <div>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold text-center mb-6">Transaction Detail</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Invoice: INV/20250119/881506</h2>
          <p><strong>Status:</strong> success</p>
          <p><strong>Total Amount:</strong> Rp 60.000</p>
          <p><strong>Order Date:</strong> 2025-01-19</p>
          <p><strong>Expired Date:</strong> 2025-01-20</p>

          <div className="mt-4">
            <h3 className="font-semibold">Transaction Item</h3>
            <h4>Happytepokbulu! @vinduss</h4>
            <img src="https://dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com/badminton-tournament-flyer-design-template-ff5b113106d5d5d63e07279270623b70_screen.jpg" alt="Happytepokbulu" className="w-full h-auto rounded-lg mt-2" />
            <p><strong>Description:</strong> <span dangerouslySetInnerHTML={{ __html: "<p><strong>BARENG HAPPYTEBOX YUK!</strong><br>2024!</p><ul><li>Male & Female very welcome</li><li>All Level Beginner - Intermediate</li><li>3 lap, sudah ada member diluar rovo</li><li>Sistem rally 25 point</li><li>Include shuttlecock (kita pakai NINE/setara)</li></ul><p><strong>Fee:</strong> 60.000</p><p>PM buat join Grup kita biar rutin 😉</p><p>Thank you 🙏</p>" }} />
            <p><strong>Fee:</strong> Rp 60.000</p>
            <p><strong>Discounted Fee:</strong> Rp 70.000</p>
            <p><strong>Location:</strong> <a href="https://maps.app.goo.gl/vmByccAmBx7xQXNL9" target="_blank" rel="noopener noreferrer">Jl Pioner No. 50a, Penjaringan, Kec. Penjaringan, Jakarta 14440</a></p>
            <p><strong>Activity Date:</strong> 2024-08-11 | 09:00 - 12:00</p>
          </div>

          <div className="mt-4">
            <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500">View Payment Proof</a>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default detailMyTransaction;
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
