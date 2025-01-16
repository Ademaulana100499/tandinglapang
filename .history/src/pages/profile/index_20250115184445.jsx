import React from "react";
import { getProfile } from "@/services/profile";
export async function getServerSideProps() {
  try {
    const response = await getProfile();
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token is missing");
    }
    console.log("Profile successful:", response);
    console.log("Response Data:", response.data.data);

    return { props: { data: response.data.data || [] } };
  } catch (error) {
    console.log("Profile failed:", error);
    return { props: { data: [] } };
  }
}
const ProfilePage = ({ data }) => {
  return (
    <div>
      <h1>Nama :{data.name}</h1>
    </div>
  );
};

export default ProfilePage;
