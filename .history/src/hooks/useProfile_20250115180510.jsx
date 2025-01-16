import { handleProfile } from "@/services/auth";
import { useRouter } from "next/router";
export async function getServerSideProps() {
  try {
    const response = await handleProfile();
    console.log("Profile successful:", response);
  } catch (error) {
    console.log("Profile failed:", error);
  }
}
export const useProfile = () => {
  const router = useRouter();

  const handleButtonProfile = async () => {
    try {
      const response = await handleProfile();
      console.log("Profile successful:", response);
      deleteCookie("token");
      router.push("/login");
    } catch (error) {
      console.error("Profile failed:", error);
      alert("Profile failed. Please try again.");
    }
  };

  return { handleButtonProfile };
};
