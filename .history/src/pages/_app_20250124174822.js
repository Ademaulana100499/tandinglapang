import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { PagesTopLoader } from "nextjs-toploader/pages";

export default function App({ Component, pageProps }) {
  return (
    <>
    <HeroUIProvider>
      <PagesTopLoader showSpinner={false} />
      <Component {...pageProps} />
    </>
    
  );
}
