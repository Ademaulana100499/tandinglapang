import useCreateActivity from "@/hooks/useCreateActivity";
import { BarLoader } from "../../Features/Loading";
import SportCategoryDropdown from "@/components/Features/SportCategoryDropdown";
import { useEffect, useState } from "react";
import { LocationDropdown } from "@/components/Features/LocationDropdown";

export const CreateActivitySection = () => {
  const { formData, setFormData, handleFormCreate, isLoading } =
    useCreateActivity();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

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
    <section className="py-8 px-4 flex mx-auto bg-white shadow-lg max-w-6xl rounded-lg">
      <div className="w-full p-6 text-gray-800">
        <h3 className="text-xl font-bold mb-2">Buat Acara</h3>
        <p className="text-gray-600 text-sm mb-4">
          Daftarkan acara Anda dan dapatkan peserta dengan mudah!
        </p>

        <form
          className="w-full grid grid-cols-1 gap-4"
          onSubmit={handleFormCreate}>
          <SportCategoryDropdown setSelectedCategory={setSelectedCategory} />
          <input
            type="text"
            placeholder="Judul Acara"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500"
          />
          <textarea
            placeholder="Deskripsi Acara"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500"
          />
          <LocationDropdown setSelectedLocation={setSelectedLocation} />
          <input
            type="text"
            placeholder="Alamat"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Slot"
              value={formData.slot}
              onChange={(e) =>
                setFormData({ ...formData, slot: e.target.value })
              }
              className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Harga"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              placeholder="Tanggal Acara"
              value={formData.activity_date}
              onChange={(e) =>
                setFormData({ ...formData, activity_date: e.target.value })
              }
              className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="URL Peta"
              value={formData.map_url}
              onChange={(e) =>
                setFormData({ ...formData, map_url: e.target.value })
              }
              className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="time"
              placeholder="Jam Mulai"
              value={formData.start_time}
              onChange={(e) =>
                setFormData({ ...formData, start_time: e.target.value })
              }
              className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500"
            />
            <input
              type="time"
              placeholder="Jam Selesai"
              value={formData.end_time}
              onChange={(e) =>
                setFormData({ ...formData, end_time: e.target.value })
              }
              className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center">
            {isLoading ? <BarLoader /> : "Buat Acara"}
          </button>
        </form>
      </div>
    </section>
  );
};
