import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const EditProfileModal = ({ setIsOpen, currentProfile }) => {
  const [formData, setFormData] = useState({
    email: currentProfile.email || "",
    name: currentProfile.name || "",
    phone_number: currentProfile.phone_number || "",
    password: "",
    c_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.phone_number) {
      Swal.fire({
        title: "Data tidak boleh kosong!",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.c_password) {
      Swal.fire({
        title: "Password dan konfirmasi tidak sama!",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.put("/api/profile", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      Swal.fire({
        title: "Profile berhasil diperbarui!",
        icon: "success",
        confirmButtonColor: "#31c360",
      });

      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      Swal.fire({
        title: "Terjadi kesalahan!",
        text: error.message || "Gagal mengupdate profil.",
        icon: "error",
        confirmButtonColor: "#31c360",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-1/3">
        <h2 className="text-xl font-semibold mb-6">Edit Profil</h2>
        <form onSubmit={handleEditProfile} className="space-y-6">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={data.name}
            className="w-full p-5 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600 text-lg"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder={data.email}
            className="w-full p-5 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600 text-lg"
          />
          <input
            type="text"
            value={formData.phone_number}
            onChange={(e) =>
              setFormData({ ...formData, phone_number: e.target.value })
            }
            placeholder="No Telepon"
            className="w-full p-5 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600 text-lg"
            inputMode="numeric"
            pattern="[0-9]*"
          />
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Password Baru"
            className="w-full p-5 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600 text-lg"
          />
          <input
            type="password"
            value={formData.c_password}
            onChange={(e) =>
              setFormData({ ...formData, c_password: e.target.value })
            }
            placeholder="Konfirmasi Password"
            className="w-full p-5 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600 text-lg"
          />

          <div className="flex flex-col sm:flex-row sm:justify-between mt-6">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-8 py-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mb-4 sm:mb-0 text-lg">
              Batal
            </button>
            <button
              type="submit"
              className="px-8 py-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 text-lg"
              disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
