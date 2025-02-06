import React from "react";
import axios from "axios";
import { Navbar } from "@/components/Features/Navbar";
import { Footer } from "@/components/Features/Footer";
import { HeroSectionActivity } from "@/components/Activity/ActivityHero";
import { ActivitySchedule } from "@/components/Activity/ActivitySchedule";
import { ReactLenis } from "lenis/dist/lenis-react";

const ActivityDetailPage = ({ activityData, role }) => {
  return (
    <div>
      <Navbar />
      <div className="bg-zinc-950 ">
        <ReactLenis root options={{ lerp: 0.05 }}>
          <HeroSectionActivity activityData={activityData} role={role} />
          <ActivitySchedule activityData={activityData} role={role} />
        </ReactLenis>
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const role = context.req.cookies?.role;
  const { id } = context.params || { id: "" };

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sport-activities/${id}`,
      {
        headers: { Authorization: `Bearer ${context.req.cookies.token}` },
      }
    );

    return {
      props: {
        activityData: res.data.result || {},
        role,
      },
    };
  } catch (error) {
    console.error("Error fetching activity details:", error);
    return {
      props: {
        activityData: {},
        role,
      },
    };
  }
}

export default ActivityDetailPage;
