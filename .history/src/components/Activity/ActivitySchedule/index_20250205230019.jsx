import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreateTransactionModal } from "@/components/Transaction/CreateTransactionModal";
import { iconMap } from "../../../utils/imageIconData";
import { ButtonDeletedActivity } from "../ButtonDeletedActivity";
import { EditActivityModal } from "../EditActivityModal";
export const ActivitySchedule = ({ activityData, role }) => {
  const [descriptionContent, setDescriptionContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

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
      <ScheduleItem
        title="Tanggal"
        date={new Date(activityData.activity_date)
          .toLocaleDateString("id-ID")
          .split("/")
          .map((item) => item.padStart(2, "0"))
          .join("-")}
      />

      <ScheduleItem
        title="Waktu"
        date={`${activityData.start_time + " WIB"} - ${
          activityData.end_time + " WIB"
        }`}
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
      {role === "user" && (
        <button
          onClick={() => setIsTransactionOpen(true)}
          className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-100">
          Gabung Sekarang
        </button>
      )}
      {role === "admin" && (
        <button
          onClick={() => setIsEditOpen(true)}
          className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-100">
          Edit
        </button>
      )}
      {role === "admin" && (
        <ButtonDeletedActivity activityData={activityData} />
      )}
      <CreateTransactionModal
        isOpen={isTransactionOpen}
        setIsOpen={setIsTransactionOpen}
        activityData={activityData}
      />
      <EditActivityModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
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
