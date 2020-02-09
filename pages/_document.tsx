import React, { Children } from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import {
  DocumentContext,
  DocumentInitialProps,
  RenderPageResult,
} from 'next/dist/next-server/lib/utils';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../src/theme';

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
      originalRenderPage({
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,react/jsx-props-no-spreading
        enhanceApp: App => props => sheets.collect(<App {...props} />),
        enhanceComponent: Component => Component,
      });

    const initialProps = await super.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [...Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, shrink-to-fit=no"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
