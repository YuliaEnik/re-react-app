import './../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../Store/store';
import type { AppProps } from 'next/app';
import Layout from '../Components/Layout/layout';
import React from 'react';
import { ThemeProvider } from '~/Components/Context/themeProvider';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/icon.png" />
        <title>Art App</title>
      </Head>
    <Provider store={store}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
       </ThemeProvider>
    </Provider>
    </>
  );
}
