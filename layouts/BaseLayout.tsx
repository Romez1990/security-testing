import React, { Fragment, ReactNode } from 'react';
import Head from 'next/head';

interface Props {
  title?: string;
  children: ReactNode;
}

function BaseLayout({ title, children }: Props): JSX.Element {
  return (
    <Fragment>
      <Head>
        <title>Тестирование Безопасности{title && ` | ${title}`}</title>
      </Head>

      {children}
    </Fragment>
  );
}

export default BaseLayout;
