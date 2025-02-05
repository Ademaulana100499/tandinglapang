import React from "react";
import axios from "axios";
import { Navbar } from "@/components/Features/Navbar";
import { Footer } from "@/components/Features/Footer";
import { HeroSectionActivity } from "@/components/Activity/ActivityHero";
import { ActivitySchedule } from "@/components/Activity/ActivitySchedule";
import { ReactLenis } from "lenis/dist/lenis-react";
import Authorization from "@/components/Authentication/Authorization";

const ActivityDetailPage = ({ activityData, role }) => {
  console.log(role); // Memastikan role diterima dengan benar
  return (
    <div>
      <Authorization>
        <Navbar />
        <div className="bg-zinc-950 ">
          <ReactLenis root options={{ lerp: 0.05 }}>
            <HeroSectionActivity activityData={activityData} role={role} />
            <ActivitySchedule activityData={activityData} role={role} />
          </ReactLenis>
        </div>
        <Footer />
      </Authorization>
    </div>
  );
};

export async function getServerSideProps(context) {
  const role = context.req.cookies?.role; // Mendapatkan role dari cookies
  const { id } = context.params || { id: "" }; // Mendapatkan ID dari params

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sport-activities/${id}`,
      {
        headers: { Authorization: `Bearer ${context.req.cookies.token}` },
      }
    );

    return {
      props: {
        activityData: res.data.result || {}, // Mengirimkan data activity
        role, // Mengirimkan role juga ke props
      },
    };
  } catch (error) {
    console.error("Error fetching activity details:", error);
    return {
      props: {
        activityData: {}, // Jika terjadi error, kirimkan activityData kosong
        role, // Tetap kirimkan role meski terjadi error
      },
    };
  }
}

export default ActivityDetailPage;
