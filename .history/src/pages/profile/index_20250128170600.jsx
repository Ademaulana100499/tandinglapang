import React, { useState } from "react";
import axios from "axios";
import { EditProfileModal } from "@/components/EditProfilModal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Swal from "sweetalert2";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const ProfilePage = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditProfilOpen, setIsEditProfilOpen] = useState(false);
  const id = data?.id;
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: data.id,
    email: data.email,
    name: data.name,
    password: data.password,
    c_password: data.c_password,
    role: data.role,
    phone_number: data.phone_number,
  });

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col container mx-auto py-10 px-6 md:px-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-600">
          Profil Saya
        </h1>

        <div className="bg-white shadow-lg p-8 w-full max-w-5xl border-2 border-green-400 mx-auto">
          <p className="mt-4 text-lg md:text-xl text-black">
            <strong>Nama:</strong> {data.name}
          </p>
          <p className="mt-4 text-lg md:text-xl text-black">
            <strong>Email:</strong> {data.email}
          </p>
          <p className="mt-3 text-lg md:text-xl text-black">
            <strong>Role:</strong> {data.role}
          </p>
          <p className="mt-3 text-lg md:text-xl text-black">
            <strong>Phone:</strong> {data.phone_number}
          </p>

          <div className="mt-8 border-t border-green-500 pt-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsEditProfilOpen(true);
              }}
              className="px-8 py-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 text-lg md:text-xl">
              Edit Profil
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <EditProfileModal
        isOpen={isEditProfilOpen}
        setIsOpen={setIsEditProfilOpen}
        data={data}
      />
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
