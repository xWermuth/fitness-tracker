import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';

function MyApp({ Component, pageProps }: AppProps) {
  console.log({ pageProps });

  return (
    <div className="relative w-screen h-screen bg-stone-50">
      <Component {...pageProps} />
    </div>
  );
}

export default wrapper.withRedux(MyApp);
