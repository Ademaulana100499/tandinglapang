import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEditActivity from "@/hooks/useEditActivity";
import { BarLoader } from "../../Features/Loading";
import SportCategoryDropdown from "@/components/Features/SportCategoryDropdown";
import { LocationDropdown } from "@/components/Features/LocationDropdown";
import { format } from "date-fns";
export const EditActivityModal = ({ isOpen, setIsOpen, activityData }) => {
  const { formData, setFormData, handleFormEdit, isLoading } = useEditActivity(
    setIsOpen,
    activityData?.id
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const today = format(new Date(), "yyyy-MM-dd");
  const currentTime = format(new Date(), "HH:mm");
  useEffect(() => {
    if (activityData) {
      const formatTime = (time) => (time ? time.slice(0, 5) : "");

      setFormData({
        title: activityData.title || "",
        description: activityData.description || "",
        slot: activityData.slot || "",
        price: activityData.price || "",
        address: activityData.address || "",
        activity_date: activityData.activity_date || "",
        start_time: formatTime(activityData.start_time) || "",
        end_time: formatTime(activityData.end_time) || "",
        map_url: activityData.map_url || "",
        sport_category_id: activityData.sport_category_id || "",
        city_id: activityData.city_id || "",
      });

      setSelectedCategory(activityData.sport_category_id || "");
      setSelectedLocation({
        label: activityData.city_name || "",
        value: { city_id: activityData.city_id },
      });
    }
  }, [activityData, setFormData]);

  useEffect(() => {
    if (selectedLocation) {
      setFormData((prev) => ({
        ...prev,
        city_id: selectedLocation.value.city_id,
      }));
    }
  }, [selectedLocation, setFormData]);

  useEffect(() => {
    if (selectedCategory) {
      setFormData((prev) => ({
        ...prev,
        sport_category_id: selectedCategory,
      }));
    }
  }, [selectedCategory, setFormData]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-black bg-opacity-60 fixed inset-0 z-50 flex justify-center items-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 shadow-xl w-full max-w-lg md:max-w-4xl text-gray-800 relative rounded-lg max-h-[80vh] overflow-hidden">
            <h3 className="text-xl font-bold mb-2 text-center">Edit Acara</h3>
            <p className="text-gray-600 text-sm mb-4 text-center">
              Perbarui informasi acara Anda.
            </p>

            {/* Wrapper untuk membuat konten scroll ke samping */}
            <div className="flex gap-4 overflow-x-auto flex-nowrap p-2">
              <form
                className="flex gap-4 flex-nowrap w-max"
                onSubmit={(e) => handleFormEdit(e)}>
                <div className="flex flex-col gap-4">
                  <SportCategoryDropdown
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                  <input
                    type="text"
                    placeholder="Judul Acara"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-64"
                  />
                  <textarea
                    placeholder="Deskripsi Acara"
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-64"
                  />
                  <LocationDropdown
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Alamat"
                    value={formData.address || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-64"
                  />
                  <input
                    type="number"
                    placeholder="Slot"
                    value={formData.slot || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, slot: e.target.value })
                    }
                    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-64"
                  />
                  <input
                    type="number"
                    placeholder="Harga"
                    value={formData.price || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-64"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <input
                    type="date"
                    placeholder="Tanggal Acara"
                    value={formData.activity_date || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        activity_date: e.target.value,
                      })
                    }
                    min={today}
                    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-64"
                  />
                  <input
                    type="text"
                    placeholder="URL Peta"
                    value={formData.map_url || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, map_url: e.target.value })
                    }
                    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-64"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <input
                    type="time"
                    placeholder="Jam Mulai"
                    value={formData.start_time}
                    onChange={(e) =>
                      setFormData({ ...formData, start_time: e.target.value })
                    }
                    min={currentTime}
                    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-64"
                  />
                  <input
                    type="time"
                    placeholder="Jam Selesai"
                    value={formData.end_time}
                    onChange={(e) =>
                      setFormData({ ...formData, end_time: e.target.value })
                    }
                    min={formData.start_time}
                    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-64"
                  />
                </div>
              </form>
            </div>

            {/* Tombol Aksi */}
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center">
                {isLoading ? <BarLoader /> : "Perbarui Acara"}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-all">
                Batal
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
