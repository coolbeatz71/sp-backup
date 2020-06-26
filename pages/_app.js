import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "styles/global.scss";
import Layout from "../components/Layout";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Router } from "next/router";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => {
  window.scroll({
    top: 0,
    left: 0,
  });
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
