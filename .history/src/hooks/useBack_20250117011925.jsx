import { useRouter } from "next/router";
export const useBack = () => {
  const router = useRouter();
  const handleButtonBack = () => {
    router.push("/");
  };
  return { handleButtonBack };
};
