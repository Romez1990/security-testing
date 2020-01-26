import React from 'react';
import App, { AppContext } from 'next/app';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import initStore from '../store/store';
import theme from '../src/theme';

interface Props {
  store: Store;
}

class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    );
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.remove();
  }
}

export default withRedux(initStore)(MyApp);
