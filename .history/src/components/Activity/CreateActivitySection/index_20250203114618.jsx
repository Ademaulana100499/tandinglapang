import { FiUser } from "react-icons/fi";
import useCreateActivity from "@/hooks/useCreateActivity";
import { BarLoader } from "../../Features/Loading";

export const CreateActivitySection = () => {
  const { formData, setFormData, handleFormCreate, isLoading } =
    useCreateActivity();

  return (
    <section className="py-10 px-4 ">
      <div className="w-full max-w-lg bg-white shadow-lg p-6 text-gray-800">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold">Buat Acara</h3>
          <p className="text-gray-600 text-sm">
            Daftarkan acara Anda dan dapatkan peserta dengan mudah!
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleFormCreate}>
          {[
            { type: "text", name: "title", placeholder: "Judul Acara" },
            { type: "text", name: "address", placeholder: "Alamat" },
            { type: "number", name: "slot", placeholder: "Slot" },
            { type: "number", name: "price", placeholder: "Harga" },
            {
              type: "date",
              name: "activity_date",
              placeholder: "Tanggal Acara",
            },
            { type: "time", name: "start_time", placeholder: "Jam Mulai" },
            { type: "time", name: "end_time", placeholder: "Jam Selesai" },
            { type: "text", name: "map_url", placeholder: "URL Peta" },
          ].map((input, index) => (
            <input
              key={index}
              type={input.type}
              placeholder={input.placeholder}
              value={formData[input.name]}
              onChange={(e) =>
                setFormData({ ...formData, [input.name]: e.target.value })
              }
              className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500"
            />
          ))}

          <textarea
            placeholder="Deskripsi Acara"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md flex items-center justify-center hover:bg-green-700 transition-all">
            {isLoading ? <BarLoader /> : "Buat Acara"}
          </button>
        </form>
      </div>
    </section>
  );
};
