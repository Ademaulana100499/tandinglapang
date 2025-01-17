import React from "react";
import axios from "axios";
import { useLogout } from "@/hooks/useLogout";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { useState } from "react";
const ProfilePage = ({ data }) => {
  const { handleButtonLogout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <Link href="/">back</Link>
      <h1>Nama: {data.name}</h1>
      <h1>Email: {data.email}</h1>
      <h1>Role: {data.role}</h1>
      <h1>Phone:{data.phone_number}</h1>
      <div>
        <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
          Edit Profil
        </button>

        {/* Modal Custom */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-xl"
                onClick={() => setIsOpen(false)}>
                ×
              </button>
              <h2 className="text-lg font-bold mb-4">Edit Profil</h2>
              <input
                type="text"
                placeholder="Nama"
                className="border p-2 w-full mb-2"
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full mb-2"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsOpen(false)}>
                  Batal
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded">
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <button onClick={handleButtonLogout}> Logout</button>
      <Footer />
    </div>
  );
};

export default ProfilePage;

export async function getServerSideProps({ req }) {
  const token = req.cookies.token || "";
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { props: { data: res.data.data || [] } };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { props: { data: {} } };
  }
}
