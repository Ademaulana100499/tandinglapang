import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCreateActivity from "@/hooks/useCreateActivity";
import { BarLoader } from "../../Features/Loading";
import SportCategoryDropdown from "@/components/Features/SportCategoryDropdown";
import { LocationDropdown } from "@/components/Features/LocationDropdown";
import { format } from "date-fns";

export const CreateActivityModal = ({ isOpen, setIsOpen }) => {
  const { formData, setFormData, handleFormCreate, isLoading } =
    useCreateActivity(setIsOpen);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const today = format(new Date(), "yyyy-MM-dd");
  const currentTime = format(new Date(), "HH:mm");

  useEffect(() => {
    if (selectedLocation) {
      setFormData((prev) => ({
        ...prev,
        city_id: selectedLocation.value.city_id,
      }));
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (selectedCategory) {
      setFormData((prev) => ({ ...prev, sport_category_id: selectedCategory }));
    }
  }, [selectedCategory]);

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
            className="bg-white p-6 shadow-xl w-full max-w-sm md:max-w-3xl text-gray-800 relative rounded-lg overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-2 text-center">Buat Acara</h3>
            <p className="text-gray-600 text-sm mb-2 text-center">
              Daftarkan acara Anda dan dapatkan peserta dengan mudah!
            </p>
            <form
              className="w-full text-xs xl:text-base grid grid-cols-1 gap-2"
              onSubmit={handleFormCreate}>
              <SportCategoryDropdown
                setSelectedCategory={setSelectedCategory}
              />
              <input
                type="text"
                placeholder="Judul Acara"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="p-2  rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-full"
              />
              <textarea
                placeholder="Deskripsi Acara"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="p-2  rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-full"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <LocationDropdown setSelectedLocation={setSelectedLocation} />
                <input
                  type="text"
                  placeholder="Alamat"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Slot"
                  value={formData.slot}
                  onChange={(e) =>
                    setFormData({ ...formData, slot: e.target.value })
                  }
                  className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-full"
                />
                <input
                  type="number"
                  placeholder="Harga"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-full"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="date"
                  placeholder="Tanggal Acara"
                  value={formData.activity_date}
                  onChange={(e) =>
                    setFormData({ ...formData, activity_date: e.target.value })
                  }
                  min={today}
                  className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-full"
                />
                <input
                  type="text"
                  placeholder="URL Peta"
                  value={formData.map_url}
                  onChange={(e) =>
                    setFormData({ ...formData, map_url: e.target.value })
                  }
                  className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-full"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="time"
                  placeholder="Jam Mulai"
                  value={formData.start_time}
                  onChange={(e) =>
                    setFormData({ ...formData, start_time: e.target.value })
                  }
                  min={currentTime}
                  className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-full"
                />
                <input
                  type="time"
                  placeholder="Jam Selesai"
                  value={formData.end_time}
                  onChange={(e) =>
                    setFormData({ ...formData, end_time: e.target.value })
                  }
                  min={formData.start_time}
                  className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 w-full"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center">
                {isLoading ? <BarLoader /> : "Buat Acara"}
              </button>
            </form>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-3 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-all">
              Batal
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
