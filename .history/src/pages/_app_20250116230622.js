import { PagesTopLoader } from "nextjs-toploader/pages";

export default function App({ Component, pageProps }) {
  return (
    <>
      <PagesTopLoader showSpinner={false} />
      <Component {...pageProps} />;
    </>
  );
}
