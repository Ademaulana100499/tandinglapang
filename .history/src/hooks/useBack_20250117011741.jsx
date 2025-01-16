import { useRouter } from "next/router";
export const useBack = () => {
  const handleButtonBack = () => {
    useRouter("/");
  };
  return { handleButtonBack };
};
