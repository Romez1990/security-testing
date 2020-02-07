import React, { useEffect } from 'react';
import { AppContext } from 'next/app';
import { NextComponentType } from 'next/dist/next-server/lib/utils';
import StoreProvider from '../components/app/StoreProvider';
import ThemeProvider from '../components/app/ThemeProvider';
import store, { Store } from '../store';

interface InitialProps {
  pageProps: object;
  store: Store;
}

interface Props extends InitialProps {
  Component: NextComponentType;
}

App.getInitialProps = async ({ Component, ctx }: AppContext): Promise<InitialProps> => {
  if (!process.browser) {
    store.profileStore.readDarkMode(ctx.req);
  }

  const pageProps =
    typeof Component.getInitialProps !== 'undefined'
      ? await Component.getInitialProps(ctx)
      : {};

  return {
    pageProps,
    store,
  };
};

function App({ Component, pageProps, store: preloadedState }: Props): JSX.Element {
  if (typeof preloadedState !== 'undefined') {
    store.hydrate(preloadedState);
  }

  useEffect((): void => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles === null) return;
    jssStyles.remove();
  }, []);

  return (
    <StoreProvider>
      <ThemeProvider>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
