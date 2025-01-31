import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";
import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { useRef } from "react";
const ActivityDetail = ({ data }) => {
  return (
    <div>
      <Navbar />
      <div className="bg-zinc-950">
        <ReactLenis
          root
          options={{
            lerp: 0.05,
          }}>
          <Hero />
          <Schedule data={data} />
        </ReactLenis>
      </div>
      <Footer />
    </div>
  );
};

export default ActivityDetail;

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full">
      <CenterImage />

      <ParallaxImages />

      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = () => {
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
        backgroundImage:
          "url(https://images.bisnis.com/posts/2024/11/13/1815710/rooms_inc_sepakbola_1_1731492481.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="https://anakbola.net/wp-content/uploads/2022/08/9B65C9C4-56FA-430E-BB1E-6A5468EE5C3E-390x220.jpeg"
        alt="And example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="https://www.radioidola.com/wp-content/uploads/2024/11/2024-11-14_b8f5caae.jpg"
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjlkHqJV8QPsbkG3xfFbeXMfR_KmFqMIf3KtQQ7daSIevAxPXz3aM8HKHSBWg7BwEl6yEERiSR3DcIlRbItkEmP5plOPJALp2I_DVd2mWpTXkir-IwJbtBwRkCkKJutB27hzElv8fcxVLEIm9c6hax1vVlJHERD2TeFLl8dVgSgzecw8PwC29xqfUkDI9xI/w640-h360/WhatsApp%20Image%202024-08-11%20at%2020.27.52%20(2).jpeg"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcoSt53MJOKw4lGtBh4EVRp7sDUFHU_bF8nlR49Mq2It6SZ8BvR1JSUsmxbkdgraUrDk0eL8Zms7Jw6LfCB-mGxM61npq9g6vt-42L_cDjT4rkLNgNRMYAvlK9iSYOIWkd1RERwcUaQUlWjMGS159TyxKDr81Yt-UZ7DYoxmYf1QfScA_GJTRbadJPTS5j/s1600/WhatsApp%20Image%202024-08-11%20at%2020.27.48.jpeg"
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
      <div className="mb-4 p-14 flex items-center justify-between border-b border-green-500 px-3 ">
        <motion.h1
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          className=" text-4xl font-black flex items-center  uppercase text-zinc-50">
          {data.title}
        </motion.h1>
        <div className="flex items-center text-end text-4xl uppercase text-zinc-500">
          <FiMapPin />
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
        date={data.start_time + " - " + data.end_time}
      />
      <ScheduleItem title="Harga" date={"Rp." + data.price} />
      <ScheduleItem title="Slot Tersedia" date={data.slot} />
      <ScheduleItem
        title="Penyelenggara"
        date={data.organizer?.name + " " + data.organizer?.email}
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
      <button className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded ">
        Gabung Sekarang
      </button>
    </section>
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
