import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LocationAndSportCategoryDropdown } from "@/components/SportCategoryDropdown";
import Authorization from "@/components/features/Auth";
import { useRouter } from "next/router";
import { WarpBackground } from "@/components/ui/warp-background";
import useActivityData from "@/hooks/useActivityData";
import PanelActivity from "@/components/PanelActivity";

import { PaginationActivity } from "@/components/PaginitionActivity";
import { EmptyStateActivity } from "@/components/EmptyStateActivity";

const ActivityPage = ({ page, sport_category_id, city_id, search }) => {
  const [open, setOpen] = useState(null);
  const router = useRouter();
  const { data, loading } = useActivityData(
    page,
    sport_category_id,
    city_id,
    search
  );

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
    <Authorization>
      <WarpBackground className="bg-green-500 min-h-screen p-0">
        <Navbar />
        <section id="explore" className="py-16 px-4">
          <div className="text-center pt-8 px-4 bg-transparent bg-opacity-50">
            <h2 className="uppercase text-3xl sm:text-4xl lg:text-6xl font-extrabold text-black">
              Cari Lawan Sparring Terbaikmu!
            </h2>
          </div>

          <div className="p-4">
            <LocationAndSportCategoryDropdown />
          </div>

          <div className="flex flex-col lg:flex-row h-fit lg:h-[450px] p-4 lg:p-0 w-full max-w-6xl mx-auto overflow-hidden">
            {loading ? (
              <div>Loading...</div>
            ) : data.length > 0 ? (
              data.map((item) => (
                <PanelActivity
                  key={item.id}
                  open={open}
                  setOpen={setOpen}
                  id={item.id}
                  title={item.title}
                  imgSrc="/images/default.jpg"
                  item={item.address}
                />
              ))
            ) : (
              <EmptyStateActivity />
            )}
          </div>

          <PaginationActivity
            page={page}
            handlePageChange={handlePageChange}
            hasMoreData={data.length > 0}
          />
        </section>
        <Footer />
      </WarpBackground>
    </Authorization>
  );
};

export default ActivityPage;
