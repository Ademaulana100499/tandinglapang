import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import { LocationAndSportCategoryDropdown } from "@/components/SportCategoryDropdown";
import Authorization from "@/components/features/Auth";
import { FaRegSadCry } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "@/hooks/useWindowsSize";
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
    // Memastikan newPage tidak kurang dari 1
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
          <section id="explore  p-4">
            <div className="text-center mb-6 p-4 bg-transparent bg-opacity-50 ">
              <h2 className="uppercase text-3xl sm:text-4xl  lg:text-6xl  md:text-6xlfont-extrabold text-black flex justify-center items-center gap-2 sm:gap-3 ">
                <GiSoccerBall className="text-white animate-bounce" />
                Cari Lawan Sparring Terbaikmu!
                <MdSportsBaseball className="text-white animate-bounce" />
              </h2>
              <WordRotate
                duration={4000}
                className="text-base font-bold text-black dark:text-white"
                words={[
                  "Temukan lawan sparring sesuai keahlianmu! Pilih kategori olahraga favorit dan tantang lawan terbaik!",
                  "Sparring bukan hanya bertanding, tapi juga meningkatkan skill dan membangun semangat sportivitas!",
                ]}
              />
            </div>

            <div className="mb-16 p-4 ">
              <LocationAndSportCategoryDropdown className="z-50" />
            </div>
            <div className="flex flex-col lg:flex-row h-fit lg:h-[450px] p-4 w-full max-w-6xl mx-auto overflow-hidden">
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
                      Coba cari lawan lain atau kembali nanti!
                    </p>
                  </motion.div>
                </div>
              )}
            </div>
            <div className="mt-10 p-4 mb-10">
              {data.length > 0 && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                    className="px-6 py-2 bg-white text-gray-800 rounded-l-lg shadow-md hover:bg-gray-100 disabled:opacity-50 transition-colors flex items-center gap-2">
                    <MdOutlineSportsTennis className="text-lg" />
                    Sebelumnya
                  </button>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={data.length < 5}
                    className="px-6 py-2 bg-white text-gray-800 rounded-r-lg shadow-md hover:bg-gray-100 disabled:opacity-50 transition-colors flex items-center gap-2">
                    Berikunya
                    <GiShuttlecock className="text-lg" />
                  </button>
                </div>
              )}
            </div>
          </section>
        </WarpBackground>
        <Footer />
      </Authorization>
    </div>
  );
};

export default ActivityPage;

const Panel = ({ open, setOpen, id, Icon, title, imgSrc, item }) => {
  const { width } = useWindowSize();
  const isOpen = open === id;
  const router = useRouter();

  return (
    <>
      <button
        className="bg-white hover:bg-slate-50 transition-colors p-3 border-r-[1px] border-b-[1px] border-slate-200 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
        onClick={() => setOpen(id)}>
        <span
          style={{
            writingMode: "vertical-lr",
          }}
          className="hidden lg:block text-xl font-light rotate-180">
          {title}
        </span>
        <span className="block lg:hidden text-xl font-light">{title}</span>
        <div className="w-6 lg:w-full aspect-square bg-green-600 text-white grid place-items-center">
          <Icon />
        </div>
        <span className="w-4 h-4 bg-white group-hover:bg-slate-50 transition-colors border-r-[1px] border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-slate-200 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width && width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-full overflow-hidden relative bg-black">
            {/* Teks Item di Atas */}
            <div className="absolute top-0 left-0 w-full ">
              <motion.div
                variants={itemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white inline-block">
                <p>{item}</p>
              </motion.div>
            </div>

            {/* Tombol Detail di Paling Kanan Bawah */}
            <div className="absolute bottom-0 right-0">
              <motion.div
                variants={itemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="px-8 py-2 bg-black/40 backdrop-blur-sm hover:bg-black transition-colors text-white">
                <button onClick={() => router.push(`/explore/${id}`)}>
                  Detail
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const panelVariants = {
  open: {
    width: "100%",
    height: "100%",
  },
  closed: {
    width: "0%",
    height: "100%",
  },
};

const panelVariantsSm = {
  open: {
    width: "100%",
    height: "200px",
  },
  closed: {
    width: "100%",
    height: "0px",
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      delay: 0.125,
    },
  },
  closed: { opacity: 0, y: "100%" },
};

export async function getServerSideProps(context) {
  try {
    const { page = 1, sport_category_id, city_id, search } = context.query;
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }/sport-activities?is_paginate=true&per_page=5&page=${page}&sport_category_id=${
      sport_category_id || ""
    }&city_id=${city_id || ""}&search=${search || ""}`;

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${context.req.cookies.token}`,
      },
    });
    return {
      props: { data: res.data.result.data || [], page: parseInt(page) },
    };
  } catch (error) {
    console.error("Error fetching activities:", error);
    return { props: { data: [], page: 1 } };
  }
}
