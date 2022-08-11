import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import { ConnectedRouter } from 'connected-next-router';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { doesHttpOnlyCookieExist } from '../utils';
import { fetchUser } from '../store/features/user/user.actions';

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (doesHttpOnlyCookieExist()) {
      // @ts-expect-error
      dispatch(fetchUser(null));
    }
  }, []);

  return (
    <div className="relative w-screen h-screen bg-stone-50">
      <ConnectedRouter>
        <Component {...pageProps} />
      </ConnectedRouter>
    </div>
  );
}

export default wrapper.withRedux(MyApp);
