import React from "react";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { ToastProvider } from "react-toast-notifications";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import { initGA, logException, logPageView } from "../utils/analytics";

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    initGA();
    logPageView();

    Router.events.on("routeChangeComplete", this.logChangeRoute);
  }

  componentWillUnmount() {
    Router.events.off("routeChangeComplete", this.logChangeRoute);
  }

  private logChangeRoute(url: string) {
    logPageView(url);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Emoji Industries</title>
        </Head>
        <ToastProvider autoDismissTimeout={2000} placement="bottom-center">
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ToastProvider>
      </React.Fragment>
    );
  }
}
