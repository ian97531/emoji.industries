import React from "react";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { ToastProvider } from "react-toast-notifications";
import CssBaseline from "@material-ui/core/CssBaseline";

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
          <Component {...pageProps} />
        </ToastProvider>
        <style jsx global>
          {`
            @media (prefers-color-scheme: dark) {
              :root {
                --text-primary: #d8d8d8;
                --text-primary-88: #d8d8d888;
                --border-visible: #444444ff;
                --border-transparent: #44444400;
                --shadow-transparent: #00000000;
                --shadow-88: #00000066;
                --shadow-66: #00000066;
                --shadow-55: #00000055;
                --shadow-18: #00000018;
                --shadow-12: #00000012;
                --shadow-0B: #0000000b;
                --shadow-08: #00000008;
                --background-transparent: #5a565600;
                --background-DD: #5a5656dd;
                --background: #5a5656;
                --selection: #606060;
                --highlight-30: #ffffff18;
                --highlight-10: #ffffff10;
              }
            }
            @media (prefers-color-scheme: light) {
              :root {
                --text-primary: #5a5656;
                --text-primary-88: #5a565688;
                --border-visible: #ddddddff;
                --border-transparent: #dddddd00;
                --shadow-transparent: #00000000;
                --shadow-88: #00000088;
                --shadow-66: #00000066;
                --shadow-55: #00000055;
                --shadow-18: #00000018;
                --shadow-12: #00000012;
                --shadow-0B: #0000000b;
                --shadow-08: #00000008;
                --background-transparent: #ffffff00;
                --background-DD: #ffffffdd;
                --background: #ffffff;
                --selection: #efefef;
                --highlight-30: #ffffff50;
                --highlight-10: #ffffff10;
              }
            }
            body {
              background-color: var(--background);
              margin: 0;
              padding: 0;
              scrollbar-width: thin;
              scrollbar-color: var(--shadow-88) var(--border-visible);
            }
            body::-webkit-scrollbar {
              width: 18px;
            }
            body::-webkit-scrollbar-track {
              background: var(--background-DD);
              border-left: 1px solid var(--border-visible);
            }
            body::-webkit-scrollbar-thumb {
              background-color: var(--shadow-88);
              border-radius: 9px;
              border: 1px solid var(--border-visible);
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}
