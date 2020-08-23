import React from "react";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Router } from "next/router";
import { withRedux } from "helpers/with-redux-store";

import "theme/index.css";
import "theme/global.scss";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => {
  window.scroll({
    top: 0,
    left: 0,
  });
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default withRedux(MyApp);
