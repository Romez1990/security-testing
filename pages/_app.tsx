import React from 'react';
import { AppContext } from 'next/app';
import { NextComponentType } from 'next/dist/next-server/lib/utils';

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
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...pageProps} />
  );
}

export default App;
