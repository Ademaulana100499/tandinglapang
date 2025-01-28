import React, { useState } from "react";
import { EditProfileModal } from "@/components/EditProfilModal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const ProfilePage = ({ data }) => {
  const [isEditProfilOpen, setIsEditProfilOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-green-500 flex flex-col w-full  py-10 px-6 md:px-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">
          Profil Saya
        </h1>

        <div className="bg-white shadow-lg p-8 w-full max-w-5xl border-2 border-black mx-auto">
          <div className="flex flex-col md:flex-row items-center space-y-4 gap-6 md:space-y-0 md:space-x-8">
            <div className="w-36 h-36 relative">
              <img
                alt="user profile"
                src="https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png"
                className="w-full h-full mx-auto border-4 border-green-600 object-cover rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
              />
              <div className="absolute bottom-0 right-0 p-1 bg-green-600 rounded-full">
                <svg
                  className="w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <p className="text-lg text-black">
                  <strong>Nama:</strong>
                </p>
                <p className="text-lg text-black">{data.name}</p>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <p className="text-lg text-black">
                  <strong>Email:</strong>
                </p>
                <p className="text-lg text-black">{data.email}</p>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <p className="text-lg text-black">
                  <strong>Phone:</strong>
                </p>
                <p className="text-lg text-black">{data.phone_number}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-black pt-6">
            <button
              onClick={() => setIsEditProfilOpen(true)}
              className="px-8 py-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 text-lg md:text-xl w-full md:w-auto">
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    return { props: { data: result.data || {} } };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { props: { data: {} } };
  }
}
