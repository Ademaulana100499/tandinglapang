import { useState } from "react";
import useCreateActivity from "@/hooks/useCreateActivity";
import { BarLoader } from "../../Features/Loading";
import SportCategoryDropdown from "@/components/Features/SportCategoryDropdown";
import { LocationDropdown } from "@/components/Features/LocationDropdown";

export const CreateActivitySection = () => {
  const { formData, setFormData, handleFormCreate, isLoading } =
    useCreateActivity();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(""); // State untuk kategori olahraga

  // Handle perubahan kategori yang dipilih
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId); // Set kategori yang dipilih
    setFormData({ ...formData, sport_category_id: categoryId }); // Kirim kategori ke formData
  };

  // Handle perubahan lokasi yang dipilih
  const handleLocationChange = (locationId) => {
    setSelectedLocation(locationId); // Set ID lokasi yang dipilih
    setFormData({ ...formData, city_id: locationId }); // Kirim ID lokasi ke formData
  };

  return (
    <section className="py-10 px-4 flex mx-auto bg-white shadow-lg max-w-6xl">
      <div className="w-full p-6 text-gray-800">
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold mb-2">Buat Acara</h3>
          <p className="text-gray-600 text-sm mb-4">
            Daftarkan acara Anda dan dapatkan peserta dengan mudah!
          </p>

          <form className="w-full" onSubmit={handleFormCreate}>
            <SportCategoryDropdown setSelectedCategory={handleCategoryChange} />

            <input
              type="text"
              placeholder="Judul Acara"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 mb-4"
            />
            <textarea
              placeholder="Deskripsi Acara"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 mb-4"
            />
            <LocationDropdown
              selectedLocation={selectedLocation}
              setSelectedLocation={handleLocationChange} // Passing function to handle location change
            />
            <input
              type="text"
              placeholder="Alamat"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 mb-4"
            />
            <input
              type="number"
              placeholder="Slot"
              value={formData.slot}
              onChange={(e) =>
                setFormData({ ...formData, slot: e.target.value })
              }
              className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 mb-4"
            />
            <input
              type="number"
              placeholder="Harga"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 mb-4"
            />
            <input
              type="date"
              placeholder="Tanggal Acara"
              value={formData.activity_date}
              onChange={(e) =>
                setFormData({ ...formData, activity_date: e.target.value })
              }
              className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 mb-4"
            />
            <input
              type="time"
              placeholder="Jam Mulai"
              value={formData.start_time}
              onChange={(e) =>
                setFormData({ ...formData, start_time: e.target.value })
              }
              className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 mb-4"
            />
            <input
              type="time"
              placeholder="Jam Selesai"
              value={formData.end_time}
              onChange={(e) =>
                setFormData({ ...formData, end_time: e.target.value })
              }
              className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 mb-4"
            />
            <input
              type="text"
              placeholder="URL Peta"
              value={formData.map_url}
              onChange={(e) =>
                setFormData({ ...formData, map_url: e.target.value })
              }
              className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 mb-4"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white flex items-center justify-center py-3 hover:bg-green-700 transition-all">
              {isLoading ? <BarLoader /> : "Buat Acara"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
