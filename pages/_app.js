import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import "theme/ngprogress.scss";
import "theme/index.css";
import "theme/global.scss";
import "styles/global.scss";

import { isEmpty } from "lodash";
import NProgress from "nprogress";
import { Router, useRouter } from "next/router";
import Head from "next/head";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { withRedux } from "helpers/with-redux-store";
import getInitialProps from "helpers/getInitialProps";
import Context from "helpers/context";
import "react-image-crop/dist/ReactCrop.css";
import { getLanguage } from "helpers/getLanguage";
import IndexPage from "./index";
import protectedRoutes from "../constants/protectedRoute";
import getToken from "helpers/getToken";
import getCurrentUser from "redux/actions/user/getCurrentUser";
import clearCurrentUser from "redux/actions/user/clearCurrentUser";
import locales from "constants/locales";

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

const InterCom = dynamic(
  () => {
    return import("../components/Intercom");
  },

  {
    ssr: false,
  },
);

const MyApp = ({ Component, pageProps, svpProps }) => {
  const { pathname, replace } = useRouter();
  const dispatch = useDispatch();
  const saveToken = getToken();

  const defaultComponent = <Component {...pageProps} svpProps={svpProps} />;
  const [component, setComponent] = useState(defaultComponent);

  const { isLoggedin, data: user } = useSelector(
    ({ user: { currentUser } }) => currentUser,
  );

  useEffect(() => {
    if (isEmpty(saveToken)) clearCurrentUser(dispatch);
    if (!isEmpty(saveToken)) getCurrentUser(dispatch);
  }, [saveToken]);

  useEffect(() => {
    if (isEmpty(saveToken) && protectedRoutes.includes(pathname)) {
      replace("/");
      setComponent(<IndexPage {...pageProps} svpProps={svpProps} />);
    } else if (!isEmpty(saveToken) && !isLoggedin && isEmpty(user)) {
      localStorage.removeItem("save-token");
      clearCurrentUser(dispatch);
    } else {
      setComponent(defaultComponent);
    }
  }, [pathname, saveToken, user]);

  locales.changeLanguage(user.language || getLanguage());
  moment.locale(user.language || getLanguage());
  return (
    <Context.Provider value={{ svpProps }}>
      {component}
      <InterCom />
    </Context.Provider>
  );
};

MyApp.getInitialProps = getInitialProps;

export default withRedux(MyApp);
