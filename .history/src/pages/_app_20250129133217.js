import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { PagesTopLoader } from "nextjs-toploader/pages";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <HeroUIProvider>
        <PagesTopLoader showSpinner={false} color="green" />
        <Component {...pageProps} />
      </HeroUIProvider>
    </div>
  );
}
