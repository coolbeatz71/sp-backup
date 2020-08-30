import React from "react";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Router } from "next/router";
import { withRedux } from "helpers/with-redux-store";
import getInitialProps from "helpers/getInitialProps";
import Context from "helpers/context";
import "react-image-crop/dist/ReactCrop.css";

import "theme/index.css";
import "theme/global.scss";
import "styles/global.scss";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => {
  window.scroll({
    top: 0,
    left: 0,
  });
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps, svpProps }) => {
  return (
    <Context.Provider value={{ svpProps }}>
      <Component {...pageProps} svpProps={svpProps} />
    </Context.Provider>
  );
};

MyApp.getInitialProps = getInitialProps;

export default withRedux(MyApp);
