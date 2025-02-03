import React, { useState } from "react";
import { Navbar } from "@/components/Features/Navbar";
import { Footer } from "@/components/Features/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import { FilterActivity } from "@/components/Activity/FilterActivity";
import Authorization from "@/components/Authentication/Authorization";
import { motion } from "framer-motion";
import { WordRotate } from "@/components/ui/word-rotate";
import { WarpBackground } from "@/components/ui/warp-background";
import { imageMap, iconMap } from "@/utils/imageIconData";
import { MdSportsBasketball, MdOutlineSportsTennis } from "react-icons/md";
import { GiSoccerBall, GiShuttlecock } from "react-icons/gi";
import Panel from "@/components/Activity/PanelActivity";
import { CreateActivitySection } from "@/components/Activity/CreateActivitySection";

const ActivityPage = ({ data, page }) => {
  const [open, setOpen] = useState(data[0]?.id || null);
  const router = useRouter();
  console.log(data);
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
        <Navbar />
        <WarpBackground className="bg-green-500 min-h-screen p-0">
          <section id="explore py-16 px-4">
            <div className="text-center pt-8 px-4 bg-transparent bg-opacity-50">
              <h2 className="uppercase text-3xl sm:text-4xl lg:text-6xl md:text-6xl font-extrabold text-black flex justify-center items-center gap-2 sm:gap-3">
                <GiSoccerBall className="text-white animate-bounce" />
                Cari Lawan Sparring Terbaikmu!
                <MdSportsBasketball className="text-white animate-bounce" />
              </h2>
              <WordRotate
                duration={4000}
                className="text-xl sm:text-xl lg:text-2xl md:text-2xl font-semibold text-black dark:text-white"
                words={[
                  "Temukan lawan sparring sesuai keahlianmu! Pilih kategori olahraga favorit dan tantang lawan terbaik!",
                  "Sparring bukan hanya bertanding, tapi juga meningkatkan skill dan membangun semangat sportivitas!",
                ]}
              />
            </div>
            <div className="p-4">
              <CreateActivitySection />
            </div>

            <div className="p-4">
              <FilterActivity className="z-50" />
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
                      iconMap[item.sport_category?.name.toLowerCase()] ||
                      iconMap["default"]
                    }
                    title={item.title}
                    imgSrc={
                      Array.isArray(
                        imageMap[item.sport_category?.name.toLowerCase()]
                      )
                        ? imageMap[item.sport_category?.name.toLowerCase()][0]
                        : imageMap["default"][0]
                    }
                    item={item.address}
                  />
                ))
              ) : (
                <div className="w-full flex justify-center items-center text-white text-lg p-10 relative">
                  <div className="absolute inset-0  opacity-50 bg-black/50  "></div>
                  <motion.div
                    className="relative text-center p-6 transform transition-all duration-500"
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}>
                    <div className="flex justify-center mb-4">
                      <div>
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
            <div className="mt-8 p-4 mb-10">
              {data.length > 0 && (
                <div className="flex justify-center">
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
