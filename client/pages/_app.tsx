import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import { ConnectedRouter } from 'connected-next-router';

function MyApp({ Component, pageProps }: AppProps) {
  console.log({ pageProps });

  return (
    <div className="relative w-screen h-screen bg-stone-50">
      <ConnectedRouter>
        <Component {...pageProps} />
      </ConnectedRouter>
    </div>
  );
}

export default wrapper.withRedux(MyApp);
