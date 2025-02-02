import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Home/Footer";
import { RevealLinks } from "@/components/Home/HeroSection2";
import { DragCards } from "@/components/Home/HeroSection1";
import { CategorySport } from "@/components/Home/CategorySection";
import { AdminSection } from "@/components/Home/AdminSection";
import { AboutSection } from "@/components/Home/AboutSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>TandingLapang</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="font-contrail-one">
        <Navbar />
        <DragCards />
        <RevealLinks />
        <CategorySport />
        <AdminSection />
        <AboutSection />
        <Footer />
      </div>
    </>
  );
}
