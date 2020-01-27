import React from 'react';
import App, { AppContext } from 'next/app';
import { Store } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import initStore, { AppState, AppAction } from '../store/store';
import { getDarkTheme, setDarkTheme } from '../store/theme/action';
import MyThemeProvider from '../components/MyThemeProvider';

interface Props {
  store: Store;
  darkTheme: boolean;
}

class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const state: AppState = ctx.store.getState();
    const dispatch = ctx.store.dispatch as ThunkDispatch<AppState, undefined, AppAction>;

    let darkTheme = false;
    darkTheme = dispatch(getDarkTheme(ctx.req));

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
