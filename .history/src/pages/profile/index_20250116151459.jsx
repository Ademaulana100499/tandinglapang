// import React from "react";
// import { getProfile } from "@/pages/api/services/profile";
// export async function getServerSideProps() {
//   try {
//     const response = await getProfile();

//     console.log("Profile successful:", response);
//     console.log("Response Data:", response.data.data);

//     return { props: { data: response.data.data || [] } };
//   } catch (error) {
//     console.log(error);
//     return { props: { data: [] } };
//   }
// }
// const ProfilePage = ({ data }) => {
//   return (
//     <div>
//       <h1>Nama :{data.name}</h1>
//     </div>
//   );
// };

// export default ProfilePage;

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
