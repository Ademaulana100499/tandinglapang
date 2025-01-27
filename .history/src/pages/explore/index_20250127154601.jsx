import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import SportCategoryDropdown from "@/components/SportCategoryDropdown/SportCategoryDropdown";
import Authorization from "@/components/features/Auth";
import { FiBarChart, FiBell, FiDollarSign, FiPlay } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "@/hooks/useWindowsSize";
import { useState } from "react";
const ActivityPage = ({ data, page }) => {
  const router = useRouter();
  const handlePageChange = (newPage) => {
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
        <div id="explore" className="bg-gray-100 min-h-screen p-4">
          <h1 className="text-2xl font-bold mb-4">Explore</h1>
          <SportCategoryDropdown />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/explore/${item.id}`)}
                className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">
                  Category: {item.sport_category.name}
                </p>
                <p className="text-sm">Address: {item.address}</p>
                <p className="text-sm">Price: {item.price}</p>
                <p className="text-sm">
                  Discount: {item.price_discount || "N/A"}
                </p>
                <p className="text-sm">Slot: {item.slot}</p>
                <p className="text-sm">Date: {item.activity_date}</p>
                <p className="text-sm">
                  Time: {item.start_time} - {item.end_time}
                </p>
                <h3 className="text-sm font-medium mt-2">Participants:</h3>
                <ul className="list-disc pl-4 text-sm">
                  {item.participants.length > 0 ? (
                    item.participants.map((participant) => (
                      <li key={participant.id}>{participant.user.name}</li>
                    ))
                  ) : (
                    <li>No participants yet</li>
                  )}
                </ul>
                <p className="text-sm font-medium mt-2">
                  Organizer: {item.organizer.name}
                </p>
                <p className="text-sm">
                  Location: {item.city.city_name},{" "}
                  {item.city.province.province_name}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 bg-gray-300 rounded-l">
              Previous
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={data.length < 5}
              className="px-4 py-2 bg-gray-300 rounded-r">
              Next
            </button>
          </div>
        </div>
        <Footer />
      </Authorization>
    </div>
  );
};

export default ActivityPage;
const Panel = ({ open, setOpen, id, Icon, title, imgSrc, description }) => {
  const { width } = useWindowSize();
  const isOpen = open === id;

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
        <div className="w-6 lg:w-full aspect-square bg-indigo-600 text-white grid place-items-center">
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
            className="w-full h-full overflow-hidden relative bg-black flex items-end">
            <motion.div
              variants={descriptionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white">
              <p>{description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CardSport;

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

const descriptionVariants = {
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
