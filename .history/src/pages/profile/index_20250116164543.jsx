import React from "react";
import axios from "axios";

export async function getServerSideProps(context) {
  try {
    const { req } = context;
    const token = req.cookies.token || "";

    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/me`, // Sesuaikan endpoint API
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("Profile successful:", response.data);

    return {
      props: { data: response.data || {} }, // Pastikan data tersedia
    };
  } catch (error) {
    console.error("Error fetching profile:", error);

    return {
      props: { data: {} }, // Beri default kosong jika error
    };
  }
}

const ProfilePage = ({ data }) => {
  return (
    <div>
      <h1>Nama: {data.data.name || "Tidak tersedia"}</h1>
    </div>
  );
};

export default ProfilePage;
