import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ConnectedRouter } from 'connected-next-router';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { routes } from '../config';
import mc from '../utils/mc.utils';
import { wrapper } from '../store/store';

function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const { pathname } = useRouter();
  const padding = routes[pathname]?.disablePadding ? '' : 'p-main';

  return (
    <div className={mc('relative w-screen h-screen bg-main-dark text-white', padding)}>
      <Provider store={store}>
        <ConnectedRouter>
          <Component {...pageProps} />
        </ConnectedRouter>
      </Provider>
    </div>
  );
}

export default MyApp;
