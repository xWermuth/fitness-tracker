import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import { ConnectedRouter } from 'connected-next-router';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  // useEffect(() => {
  //   if (hasFetched.current) return;

  //   hasFetched.current = true;
  //   getUserDetails().then(console.log);
  // }, [hasFetched.current]);

  return (
    <div className="relative w-screen h-screen bg-stone-50">
      <ConnectedRouter>
        <Component {...pageProps} />
      </ConnectedRouter>
    </div>
  );
}

export default wrapper.withRedux(MyApp);
