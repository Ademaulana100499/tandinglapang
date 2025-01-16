import React from "react";
import { getProfile } from "@/services/profile";
export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });
  console.log("Token on server:", token);
  try {
    const response = await getProfile();
    console.log("Profile successful:", response);
    console.log("Response Data:", response.data);

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
