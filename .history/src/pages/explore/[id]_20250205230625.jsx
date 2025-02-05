import React from "react";
import axios from "axios";
import { Navbar } from "@/components/Features/Navbar";
import { Footer } from "@/components/Features/Footer";
import { HeroSectionActivity } from "@/components/Activity/ActivityHero";
import { ActivitySchedule } from "@/components/Activity/ActivitySchedule";
import { ReactLenis } from "lenis/dist/lenis-react";
import Authorization from "@/components/Authentication/Authorization";
const ActivityDetailPage = ({ activityData, role }) => {
  console.log(role);
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
  const role = context.req.cookies?.role;
  const { id } = context.params || { id: "" };
  console.log(role);
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sport-activities/${id}`,
      {
        headers: { Authorization: `Bearer ${context.req.cookies.token}` },
      }
    );
    return { props: { activityData: res.data.result || {} } };
  } catch (error) {
    console.error("Error fetching activity details:", error);
    return { props: { activityData: {}, role } };
  }
}

export default ActivityDetailPage;
