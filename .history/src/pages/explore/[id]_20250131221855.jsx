import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
import { ReactLenis } from "lenis/dist/lenis-react";
import { iconMap, imageMap } from "@/components/utils/imageIconData";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { CostBreakdownModal } from "@/components/CostBreakdownModal";

const SECTION_HEIGHT = 1500;

const ActivityDetail = ({ data }) => {
  return (
    <div>
      <Navbar />
      <div className="bg-zinc-950">
        <ReactLenis root options={{ lerp: 0.05 }}>
          <Hero data={data} />
          <Schedule data={data} />
        </ReactLenis>
      </div>
      <Footer />
    </div>
  );
};

export default ActivityDetail;

const Hero = ({ data }) => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full">
      <CenterImage data={data} />
      <ParallaxImages data={data} />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = ({ data }) => {
  const { scrollY } = useScroll();
  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${
          imageMap[data?.sport_category.name?.toLowerCase()]?.[0] ||
          imageMap["default"]?.[0]
        })`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = ({ data }) => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src={
          imageMap[data?.sport_category.name?.toLowerCase()][1] ||
          imageMap["default"][1]
        }
        alt="And example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src={
          imageMap[data?.sport_category.name?.toLowerCase()][2] ||
          imageMap["default"][2]
        }
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src={
          imageMap[data?.sport_category.name?.toLowerCase()][3] ||
          imageMap["default"][3]
        }
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src={
          imageMap[data?.sport_category.name?.toLowerCase()][4] ||
          imageMap["default"][4]
        }
        alt="Orbiting satellite"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = ({ data }) => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCostBreakdownOpen, setIsCostBreakdownOpen] = useState(false);

  useEffect(() => {
    if (data.description) {
      setDescription(data.description);
    }
    setIsLoading(false);
  }, [data.description]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-white">
      <div className="mb-4 p-14 flex items-center justify-between border-b border-green-500 px-3">
        <motion.h1
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          className="text-4xl font-black flex items-center uppercase text-zinc-50">
          {data.title}
        </motion.h1>
        <div className="flex items-center text-end text-4xl uppercase text-white">
          {iconMap[data?.sport_category.name?.toLowerCase()] &&
            React.createElement(
              iconMap[data?.sport_category.name?.toLowerCase()]
            )}
        </div>
      </div>

      <ScheduleItem
        title="Deskripsi"
        date={<span dangerouslySetInnerHTML={{ __html: description }} />}
      />
      <ScheduleItem title="Lokasi" date={data.address} />
      <ScheduleItem title="Tanggal" date={data.activity_date} />
      <ScheduleItem
        title="Waktu"
        date={`${data.start_time} - ${data.end_time}`}
      />
      <ScheduleItem title="Harga" date={`Rp.${data.price}`} />
      <ScheduleItem title="Slot Tersedia" date={data.slot} />
      <ScheduleItem
        title="Penyelenggara"
        date={`${data.organizer?.name} ${data.organizer?.email}`}
      />
      <ScheduleItem
        title="Peserta"
        date={
          data.participants?.length > 0
            ? data.participants
                .map((participant) => `${participant.user.name} `)
                .join(", ")
            : "No participants"
        }
      />
      <ScheduleItem
        title="Lokasi"
        date={
          <a
            href={data.map_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline">
            Klik di sini
          </a>
        }
      />
      <button
        onClick={() => setIsCostBreakdownOpen(true)}
        type="button"
        className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-100">
        Gabung Sekarang
      </button>
      <CostBreakdownModal
        isOpen={isCostBreakdownOpen}
        setIsOpen={setIsCostBreakdownOpen}
        data={data}
      />
    </section>
  );
};

const ScheduleItem = ({ title, date }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-4 flex items-center justify-between border-b border-green-500 px-3 pb-4">
      <div>
        <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
        <p className="text-sm uppercase text-zinc-500">{date}</p>
      </div>
    </motion.div>
  );
};

export async function getServerSideProps(context) {
  const param = context.params || { id: "" };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sport-activities/${param.id}`,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies.token}`,
        },
      }
    );
    return { props: { data: res.data.result || {} } };
  } catch (error) {
    console.error("Error fetching activity details:", error);
    return { props: { data: {} } };
  }
}
