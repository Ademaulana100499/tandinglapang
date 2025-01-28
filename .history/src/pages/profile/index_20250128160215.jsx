import React from "react";
import axios from "axios";
import { EditProfileModal } from "@/components/EditProfilModal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import Swal from "sweetalert2";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const ProfilePage = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditProfilOpen, setIsEditProfilOpen] = useState(false);
  const id = data?.id;
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: data.email,
    name: data.name,
    password: data.password,
    c_password: data.c_password,
    role: data.role,
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
              onClick={() => setIsOpen(true)}
              className="px-8 py-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 text-lg md:text-xl">
              Edit Profil
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();

                setIsRegisterOpen(true);
              }}
              className="px-8 py-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 text-lg md:text-xl">
              Edit Profil
            </button>
            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-10 rounded-lg shadow-lg relative w-full max-w-5xl mx-4">
                  <button
                    className="absolute top-2 right-2 text-2xl text-black"
                    onClick={() => setIsOpen(false)}>
                    ×
                  </button>
                  <h2 className="text-3xl font-semibold text-center text-green-600 mb-6">
                    Edit Profil
                  </h2>
                  <div className="space-y-6">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder={data.name}
                      className="w-full p-5 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600 text-lg md:text-xl"
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder={data.email}
                      className="w-full p-5 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600 text-lg md:text-xl"
                    />
                    <input
                      type="text"
                      value={formData.phone_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone_number: e.target.value,
                        })
                      }
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                      }
                      placeholder="No Telepon"
                      className="w-full p-5 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600 text-lg md:text-xl"
                    />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="New Password"
                      className="w-full p-5 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600 text-lg md:text-xl"
                    />
                    <input
                      type="password"
                      value={formData.c_password}
                      onChange={(e) =>
                        setFormData({ ...formData, c_password: e.target.value })
                      }
                      placeholder="Confirm Password"
                      className="w-full p-5 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600 text-lg md:text-xl"
                    />
                    <div className="flex flex-col sm:flex-row sm:justify-between mt-6">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-8 py-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mb-4 sm:mb-0 text-lg md:text-xl">
                        Batal
                      </button>
                      <button
                        onClick={handleEditProfile}
                        className="px-8 py-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 text-lg md:text-xl">
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
      <EditProfileModal
        isOpen={isEditProfilOpen}
        setIsOpen={setIsEditProfilOpen}
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
