import React from "react";
import axios from "axios";

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;

  if (!token) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { props: { user: data?.data || {} } };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { props: { user: {} } };
  }
}

const ProfilePage = ({ user }) => (
  <div>
    <h1>Nama: {user.name || "Tidak tersedia"}</h1>
  </div>
);

export default ProfilePage;
