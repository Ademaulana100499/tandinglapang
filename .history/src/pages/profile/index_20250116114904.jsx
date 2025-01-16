import React from "react";
import useProfile from "@/hooks/useProfile";

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  console.log({ token });
  const resp = await fetch(`${process.env.SERVER_URL}/api/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    return { props: { data: null } };
  }

  const data = await resp.json();
  return { props: { data: data.data || undefined } };
}

const ProfilePage = ({ data }) => {
  const { onLogout } = useProfile();
  return (
    <div>
      <h1>Nama :{data?.data?.name}</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
