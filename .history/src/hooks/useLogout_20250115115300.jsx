import { handleLogout } from "@/services/auth"; // Fungsi logout API
import { useRouter } from "next/router";

export const useLogout = () => {
  const router = useRouter(); // Untuk navigasi setelah logout

  const handleButtonLogout = async () => {
    try {
      // Panggil fungsi handleLogout
      const response = await handleLogout();

      if (response?.success) {
        // Pastikan response dari API logout berhasil
        // Redirect ke halaman login atau lainnya
        router.push("/login");
      } else {
        console.error("Logout failed:", response?.message);
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout.");
    }
  };

  return { handleButtonLogout }; // Kembalikan fungsi untuk digunakan di komponen lain
};
