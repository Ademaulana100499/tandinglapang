import Head from "next/head";
import { Navbar } from "@/components/Features/Navbar";
import { HeroSection2 } from "@/components/Home/HeroSection2";
import { HeroSection1 } from "@/components/Home/HeroSection1";
import { CategorySection } from "@/components/Home/CategorySection";
import { AdminSection } from "@/components/Home/AdminSection";
import { AboutSection } from "@/components/Home/AboutSection";
import { Footer } from "@/components/Features/Footer";
export default function Home() {
  return (
    <>
      <Head>
        <title>TandingLapang</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="font-contrail-one">
        <Navbar />
        <HeroSection1 />
        <HeroSection2 />
        <CategorySection />
        <AdminSection />
        <AboutSection />
        <Footer />
      </div>
    </>
  );
}
