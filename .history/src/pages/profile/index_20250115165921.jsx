import React from "react";
import { handleProfile } from "@/services/profile";
export async function getServerSideProps(context) {
  try {
    const response = await handleProfile();
    console.log("Profile successful:", response);
  } catch (error) {
    console.log("Profile failed:", error);
  }
}
const ProfilePage = () => {
  return (
    <div>
      <h1>profile</h1>
    </div>
  );
};

export default ProfilePage;
