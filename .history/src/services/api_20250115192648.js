// pages/index.js
import { getCookie } from "cookies-next";
import axios from "axios";

export async function getServerSideProps(context) {
  // Ambil token dari cookies pada request server-side
  const token = getCookie("token", { req: context.req, res: context.res });

  console.log("Token from cookies:", token); // Debugging untuk melihat apakah token ada

  if (!token) {
    return {
      props: { error: "Token tidak ditemukan" },
    };
  }

  try {
    const response = await axios({
      method: "GET", // Ganti dengan method yang sesuai
      url: "YOUR_API_URL",
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `Bearer ${token}`, // Kirimkan token di header Authorization
      },
    });

    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    return {
      props: { error: error.message },
    };
  }
}

const HomePage = ({ data, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Data from API:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default HomePage;
