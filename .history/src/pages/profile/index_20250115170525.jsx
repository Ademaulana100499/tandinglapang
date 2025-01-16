import React from "react";
import { handleProfile } from "@/services/profile";

export async function getServerSideProps() {
  try {
    const response = await handleProfile();
    console.log("Profile successful:", response); // Ini akan terlihat di terminal
    return { props: { data: response } }; // Kirim data ke komponen sebagai props
  } catch (error) {
    console.log("Profile failed:", error); // Ini juga hanya di terminal
    return { props: { data: null } }; // Kirim null jika terjadi error
  }
}

const ProfilePage = ({ data }) => {
  if (!data) {
    return <p>Failed to load profile data.</p>;
  }

  // Console log di komponen akan muncul di browser
  console.log("Profile data in browser:", data);

  return (
    <div>
      <h1>{data.name}</h1>
      <p>Email: {data.email}</p>
      {/* Tampilkan data lainnya sesuai kebutuhan */}
    </div>
  );
};

export default ProfilePage;
