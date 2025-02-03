import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreateTransactionModal } from "@/components/Transaction/CreateTransactionModal";
import { iconMap } from "../../../utils/imageIconData";
import { ButtonDeletedActivity } from "../ButtonDeletedActivity";
export const ActivitySchedule = ({ activityData }) => {
  const [descriptionContent, setDescriptionContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (activityData.description) {
      setDescriptionContent(activityData.description);
    }
    setLoading(false);
  }, [activityData.description]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section
      id="activity-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-white">
      <div className="mb-4 p-14 flex items-center justify-between border-b border-green-500 px-3">
        <motion.h1
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          className="text-4xl font-black flex items-center uppercase text-zinc-50">
          {activityData.title}
        </motion.h1>
        <div className="flex items-center text-end text-4xl uppercase text-white">
          {iconMap[activityData?.sport_category.name?.toLowerCase()] &&
            React.createElement(
              iconMap[activityData?.sport_category.name?.toLowerCase()]
            )}
        </div>
      </div>
      <ScheduleItem
        title="Deskripsi"
        date={<span dangerouslySetInnerHTML={{ __html: descriptionContent }} />}
      />
      <ScheduleItem title="Lokasi" date={activityData.address} />
      <ScheduleItem title="Tanggal" date={activityData.activity_date} />
      <ScheduleItem
        title="Waktu"
        date={`${activityData.start_time} - ${activityData.end_time}`}
      />
      <ScheduleItem title="Harga" date={`Rp.${activityData.price}`} />
      <ScheduleItem title="Slot Tersedia" date={activityData.slot} />
      <ScheduleItem
        title="Penyelenggara"
        date={`${activityData.organizer?.name} ${activityData.organizer?.email}`}
      />
      <ScheduleItem
        title="Peserta"
        date={
          activityData.participants?.length > 0
            ? activityData.participants
                .map((participant) => `${participant.user.name}`)
                .join(", ")
            : "No participants"
        }
      />
      <ScheduleItem
        title="Lokasi"
        date={
          <a
            href={activityData.map_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline">
            Klik di sini
          </a>
        }
      />
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-100">
        Gabung Sekarang
      </button>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-100">
        Edit
      </button>
      <ButtonDeletedActivity activityData={activityData} />
      <CreateTransactionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        activityData={activityData}
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
