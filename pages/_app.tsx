import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Provider from '../hooks/useGlobalContext';
import Header from '../components/Header';
import Head from 'next/head';
import Footer from '../components/Footer';
import PageProgressBar from '../components/PageProgressBar';
import { useState } from 'react';
import Router from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const [showProgressBar, setShowProgressBar] = useState(false);
  Router.events.on('routeChangeStart', () => {
    setShowProgressBar(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setShowProgressBar(false);
  });
  Router.events.on('routeChangeError', () => {
    setShowProgressBar(false);
  });
  return (
    <Provider>
      {showProgressBar && <PageProgressBar />}
      <Header />
      <Head>
        <link
          rel="shortcut icon"
          href="/favicon-icon.png"
          type="image/x-icon"
        />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
