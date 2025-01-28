import React, { useState } from "react";
import { EditProfileModal } from "@/components/EditProfilModal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const ProfilePage = ({ data }) => {
  const [isEditProfilOpen, setIsEditProfilOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col container mx-auto py-10 px-6 md:px-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-600">
          Profil Saya
        </h1>

        <div className="bg-white shadow-lg p-8 w-full max-w-5xl border-2 border-green-400 mx-auto">
          <div className="flex items-center mb-6">
            <img
              src="https://via.placeholder.com/100" // Dummy profile picture
              alt="Profile Picture"
              className="w-24 h-24 rounded-full border-2 border-green-400 mr-6"
            />
            <div>
              <p className="text-lg md:text-xl text-black">
                <strong>Nama:</strong> {data.name}
              </p>
              <p className="mt-2 text-lg md:text-xl text-black">
                <strong>Role:</strong> {data.role}
              </p>
              <p className="text-lg md:text-xl text-black mt-2">
                <strong>Email:</strong> {data.email}
              </p>
              <p className="mt-3 text-lg md:text-xl text-black">
                <strong>Phone:</strong> {data.phone_number}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-black">Tentang Saya</h2>
            <p className="mt-4 text-lg text-black">
              Saya adalah seorang profesional di bidang penyewaan ruang, yang
              memiliki pengalaman dalam membantu pelanggan menemukan ruang yang
              sesuai dengan kebutuhan mereka, apakah itu untuk acara, kantor,
              atau kegiatan lainnya. Saya berkomitmen untuk memberikan
              pengalaman terbaik bagi setiap pelanggan yang mencari tempat sewa
              yang nyaman dan strategis.
            </p>
          </div>

          <div className="mt-8 border-t border-green-500 pt-6">
            <button
              onClick={() => setIsEditProfilOpen(true)}
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
