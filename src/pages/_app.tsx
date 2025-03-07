import { Provider } from 'react-redux';
import { store } from '../Store/store';
import type { AppProps } from 'next/app';
import './../styles/globals.css';
//import ErrorBoundary from '../Components/ErrorBoundary';
//import { ThemeProvider } from '../Components/Context/themeProvider';
import Layout from '../Components/Layout/layout';
import React from 'react';
import { ThemeProvider } from '~/Components/Context/themeProvider';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    /*  <StrictMode> */
    /*  <ErrorBoundary> */
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>MW Characters</title>
      </Head>
    <Provider store={store}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
    </>
    /*  </ErrorBoundary> */
    /*    //</StrictMode> */
  );
}
