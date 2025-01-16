import React from "react";
import axios from "axios";

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

const ProfilePage = ({ data }) => (
  <div>
    <h1>Nama: {data.name}</h1>
    <h1>Email: {data.email}</h1>
    <h1>Role: {data.role}</h1>
    <h1>Phone:{data.phone_number}</h1>
    <button onClick={handleButtonLogout}> Logout</button>
  </div>
);

export default ProfilePage;
