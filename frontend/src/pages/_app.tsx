import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Sistema Postulacion</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
