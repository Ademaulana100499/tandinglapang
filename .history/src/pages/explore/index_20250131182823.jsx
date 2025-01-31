import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import { LocationAndSportCategoryDropdown } from "@/components/SportCategoryDropdown";
import Authorization from "@/components/features/Auth";
import { FaRegSadCry } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { GiSoccerBall, GiShuttlecock } from "react-icons/gi";
import {
  MdOutlineSportsTennis,
  MdOutlineSportsVolleyball,
  MdOutlineSportsMma,
  MdSportsSoccer,
  MdSportsBasketball,
  MdSportsGolf,
  MdSportsBaseball,
  MdSportsFootball,
} from "react-icons/md";
import { RiBilliardsFill } from "react-icons/ri";
import { WordRotate } from "@/components/ui/word-rotate";

import { WarpBackground } from "@/components/ui/warp-background";
import Panel from "@/components/Panel"; // Impor Panel yang baru dipisah

const ActivityPage = ({ data, page }) => {
  const [open, setOpen] = useState(data[0]?.id || null);
  const router = useRouter();
  const imageMap = {
    "sepak bola":
      "https://www.dailysports.id/upload/xlarge/c8f976da413050fa5cd376b956a9fda2.jpg",
    basketball:
      "https://i0.wp.com/abouttng.com/wp-content/uploads/2022/06/gambar-01-6.jpg?fit=2251%2C1252&ssl=1",
    badminton:
      "https://i0.wp.com/abouttng.com/wp-content/uploads/2022/06/gambar-01-6.jpg?fit=2251%2C1252&ssl=1",
    volleyball: "/images/volleyball.jpg",
    tennis: "/images/tennis.jpg",
    swimming: "/images/swimming.jpg",
  };
  const defaultIcon = MdSportsSoccer;
  const iconMap = {
    "sepak bola": GiSoccerBall,
    basketball: MdSportsBasketball,
    badminton: GiShuttlecock,
    volleyball: MdOutlineSportsVolleyball,
    tennis: MdOutlineSportsTennis,
    billiard: RiBilliardsFill,
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;

    router.push({
      pathname: "/explore",
      query: {
        ...router.query,
        page: newPage,
      },
    });
  };

  return (
    <div>
      <Authorization>
        <WarpBackground className="bg-green-500 min-h-screen p-0 ">
          <Navbar />
          <section id="explore  py-16 px-4">
            <div className="text-center pt-8 px-4 bg-transparent bg-opacity-50 ">
              <h2 className="uppercase text-3xl sm:text-4xl  lg:text-6xl  md:text-6xl font-extrabold text-black flex justify-center items-center gap-2 sm:gap-3 ">
                <GiSoccerBall className="text-white animate-bounce" />
                Cari Lawan Sparring Terbaikmu!
                <MdSportsBaseball className="text-white animate-bounce" />
              </h2>
              <WordRotate
                duration={4000}
                className="text-xl sm:text-xl  lg:text-2xl  md:text-2xl font-semibold text-black dark:text-white"
                words={[
                  "Temukan lawan sparring sesuai keahlianmu! Pilih kategori olahraga favorit dan tantang lawan terbaik!",
                  "Sparring bukan hanya bertanding, tapi juga meningkatkan skill dan membangun semangat sportivitas!",
                ]}
              />
            </div>
            <div className=" p-4 ">
              <LocationAndSportCategoryDropdown className="z-50" />
            </div>
            <div className="flex flex-col lg:flex-row h-fit lg:h-[450px] p-4 lg:p-0 w-full max-w-6xl mx-auto overflow-hidden">
              {data.length > 0 ? (
                data.map((item) => (
                  <Panel
                    key={item.id}
                    open={open}
                    setOpen={setOpen}
                    id={item.id}
                    Icon={
                      iconMap[item.sport_category.name.toLowerCase()] ||
                      defaultIcon
                    }
                    title={item.title}
                    imgSrc={
                      imageMap[item.sport_category.name.toLowerCase()] ||
                      "/images/default.jpg"
                    }
                    item={item.address}
                  />
                ))
              ) : (
                <div className="w-full flex justify-center items-center text-white text-lg p-10 relative">
                  <div className="absolute inset-0 bg-green-600 "></div>
                  <motion.div
                    className="relative text-center p-6 shadow-xl bg-gradient-to-r from-green-400 to-green-700 transform transition-all duration-500"
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}>
                    <div className="flex justify-center mb-4">
                      <FaRegSadCry className="text-6xl text-white animate__animated animate__fadeIn" />
                    </div>
                    <div className="flex justify-center mb-4">
                      <div>
                        {" "}
                        <p className="text-3xl font-semibold animate__animated animate__fadeIn animate__delay-1s">
                          <span className="font-bold text-white">
                            Lawan sparring
                          </span>{" "}
                          belum tersedia...
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-medium text-gray-100">
                      Cobalah untuk mencari olahraga lain atau periksa kembali
                      beberapa saat lagi!
                    </p>
                  </motion.div>
                </div>
              )}
            </div>

            <div className="w-full flex justify-center items-center py-10 space-x-3">
              <motion.div
                className="text-2xl cursor-pointer px-4 py-2 border-2 rounded-xl text-black hover:bg-black hover:text-white transition-all duration-300"
                onClick={() => handlePageChange(page - 1)}>
                Previous
              </motion.div>
              <motion.div
                className="text-2xl cursor-pointer px-4 py-2 border-2 rounded-xl text-black hover:bg-black hover:text-white transition-all duration-300"
                onClick={() => handlePageChange(page + 1)}>
                Next
              </motion.div>
            </div>
          </section>
          <Footer />
        </WarpBackground>
      </Authorization>
    </div>
  );
};

export default ActivityPage;
