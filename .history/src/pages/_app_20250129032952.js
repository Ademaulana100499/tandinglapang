import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { PagesTopLoader } from "nextjs-toploader";

export default function App({ Component, pageProps }) {
  return (
    <>
      <HeroUIProvider>
        <PagesTopLoader showSpinner={false} color="green" />
        <Component {...pageProps} />
      </HeroUIProvider>
    </>
  );
}
