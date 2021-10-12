import { AppProps } from 'next/app';
import Head from 'next/head'; 

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Solid Coin</title>
      </Head>
      <div className="app">
        <header className="flex"> 
          <h1>Keep Investing!</h1>
        </header>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default CustomApp;
