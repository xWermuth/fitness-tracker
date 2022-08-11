import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import { ConnectedRouter } from 'connected-next-router';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { doesHttpOnlyCookieExist } from '../utils';
import { fetchUser } from '../store/features/user/user.actions';
import { useRouter } from 'next/router';
import { routes } from '../config';
import mc from '../utils/mc.utils';

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  const { pathname } = useRouter();
  const padding = routes[pathname]?.disablePadding ? '' : 'p-main';

  useEffect(() => {
    if (doesHttpOnlyCookieExist()) {
      // @ts-expect-error
      dispatch(fetchUser(null));
    }
  }, []);

  return (
    <div className={mc('relative w-screen h-screen bg-main-dark text-white', padding)}>
      <ConnectedRouter>
        <Component {...pageProps} />
      </ConnectedRouter>
    </div>
  );
}

export default wrapper.withRedux(MyApp);
