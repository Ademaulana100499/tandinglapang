import React from "react";
import axios from "axios";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const ProfilePage = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = data?.id;
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: data.email,
    name: data.name,
    password: data.password,
    c_password: data.c_password,
    role: "user",
    phone_number: data.phone_number,
  });
  const handleEditProfile = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/update-user/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      Swal.fire({
        title: res.data.message,
        icon: "success",
        draggable: true,
      }).then(() => {
        router.reload();
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Update Error",
        icon: "error",
        draggable: true,
      });
    }
  };
  return (
    <div>
  <Navbar />
  <div className="bg-gray-200 h-96 py-8 px-4">
    <h1 className="text-2xl font-semibold text-gray-800 mb-2">Nama: {data.name}</h1>
    <h1 className="text-xl text-gray-700 mb-2">Email: {data.email}</h1>
    <h1 className="text-xl text-gray-700 mb-2">Role: {data.role}</h1>
    <h1 className="text-xl text-gray-700 mb-4">Phone: {data.phone_number}</h1>
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
        Edit Profil
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-3xl mx-4">
            <button
              className="absolute top-2 right-2 text-xl text-gray-600"
              onClick={() => setIsOpen(false)}>
              ×
            </button>
            <h2 className="text-2xl font-semibold text-center text-green-600 mb-4">
              Edit Profil
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder={data.name}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder={data.email}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600"
              />
              <input
                type="text"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
                inputMode="numeric"
                pattern="[0-9]*"
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder={data.phone_number}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600"
              />
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="New Password"
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600"
              />
              <input
                type="password"
                value={formData.c_password}
                onChange={(e) =>
                  setFormData({ ...formData, c_password: e.target.value })
                }
                placeholder="Confirm Password"
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
                  Batal
                </button>
                <button
                  onClick={handleEditProfile}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

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
