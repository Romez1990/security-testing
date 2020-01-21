import React, { useEffect } from 'react';
import { AppContext } from 'next/app';
import { NextComponentType } from 'next/dist/next-server/lib/utils';
import ThemeProvider from '../components/app/ThemeProvider';

interface InitialProps {
  pageProps: object;
}

interface Props extends InitialProps {
  Component: NextComponentType;
}

App.getInitialProps = async ({ Component, ctx }: AppContext): Promise<InitialProps> => {
  const pageProps =
    typeof Component.getInitialProps !== 'undefined'
      ? await Component.getInitialProps(ctx)
      : {};

  return {
    pageProps,
  };
};

function App({ Component, pageProps }: Props): JSX.Element {
  useEffect((): void => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles === null) return;
    jssStyles.remove();
  }, []);

  return (
    <ThemeProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
