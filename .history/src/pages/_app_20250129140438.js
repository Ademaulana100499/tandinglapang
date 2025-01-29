import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { PagesTopLoader } from "nextjs-toploader/pages";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Platform terbaik untuk sparring olahraga dengan mudah dan cepat."
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <HeroUIProvider>
        <PagesTopLoader showSpinner={false} color="green" />
        <Component {...pageProps} />
      </HeroUIProvider>
    </>
  );
}
