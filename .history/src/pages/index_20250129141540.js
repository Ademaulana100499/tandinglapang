import Head from "next/head";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RevealLinks } from "@/components/layout/HeroSection";
import { DragCards } from "@/components/layout/DragCards";
import { CategorySport } from "@/components/layout/CategorySport";
// import { AdminSection } from "@/components/layout/AdminSection";
import { AboutSection } from "@/components/layout/AboutSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>SewaLapang</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="font-contrail-one">
        <Navbar />
        <DragCards />
        <RevealLinks />
        <CategorySport />
        {/* <AdminSection /> */}
        <AboutSection />
        <Footer />
      </div>
    </>
  );
}
