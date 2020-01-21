import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.remove();
  }
}

export default MyApp;
