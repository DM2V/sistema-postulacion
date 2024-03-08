import React from 'react';
// import "../../node_modules/bulma-helpers/css/bulma-helpers.min.css";
import "../styles/global.css";

import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Sistema Postulacion</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />

    </>
  );
}
