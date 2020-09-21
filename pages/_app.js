import React from "react";

import NProgress from "nprogress";
import { Router } from "next/router";
import Head from "next/head";
import { withRedux } from "helpers/with-redux-store";
import getInitialProps from "helpers/getInitialProps";
import Context from "helpers/context";
import "react-image-crop/dist/ReactCrop.css";

import "theme/ngprogress.scss";
import "theme/index.css";
import "theme/global.scss";
import "styles/global.scss";

const config = {
  trickle: false,
  easing: "ease",
  speed: 800,
};

const nProgress = NProgress.configure(config);

Router.events.on("routeChangeStart", () => nProgress.set(0.9).start());
Router.events.on("routeChangeComplete", () => {
  window.scroll({
    top: 0,
    left: 0,
  });
  nProgress.done();
});
Router.events.on("routeChangeError", () => nProgress.done());

const MyApp = ({ Component, pageProps, svpProps }) => {
  return (
    <Context.Provider value={{ svpProps }}>
      <Head>
        <link
          id="favicon"
          rel="shortcut icon"
          href="/icons/favicon-32x32.png"
          sizes="16x16 32x32 48x48"
          type="image/png"
        />
      </Head>
      <Component {...pageProps} svpProps={svpProps} />
    </Context.Provider>
  );
};

MyApp.getInitialProps = getInitialProps;

export default withRedux(MyApp);
