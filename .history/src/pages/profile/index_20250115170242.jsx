import React from "react";
import { handleProfile } from "@/services/profile";
export async function getServerSideProps() {
  try {
    const response = await handleProfile();
    console.log("Profile successful:", response);
  } catch (error) {
    console.log("Profile failed:", error);
    return { props: { data: [] } };
  }
}
const ProfilePage = ({ data }) => {
  return (
    <div>
      <h1>{data.name}</h1>
    </div>
  );
};

export default ProfilePage;
