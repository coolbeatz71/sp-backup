import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import "styles/global.scss";
import "theme/global.scss";
import "theme/ngprogress.scss";

import { isEmpty } from "lodash";
import NProgress from "nprogress";
import { Router, useRouter } from "next/router";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { withRedux } from "helpers/with-redux-store";
import getInitialProps from "helpers/getInitialProps";
import Context from "helpers/context";
import "react-image-crop/dist/ReactCrop.css";
import { getLanguage } from "helpers/getLanguage";
import { stringifyUrl } from "query-string";
import IndexPage from "./index";
import protectedRoutes from "../constants/protectedRoute";
import getToken from "helpers/getToken";
import getCurrentUser from "redux/actions/user/getCurrentUser";
import clearCurrentUser from "redux/actions/user/clearCurrentUser";
import updateProfile from "redux/actions/user/updateProfile";
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
  const { pathname, replace, query, push, asPath } = useRouter();
  const dispatch = useDispatch();
  const saveToken = getToken();

  const defaultComponent = <Component {...pageProps} svpProps={svpProps} />;
  const [component, setComponent] = useState(defaultComponent);

  const { isLoggedin, data: user } = useSelector(
    ({ user: { currentUser } }) => currentUser,
  );

  const userLang = user.language || getLanguage();

  const iniLanguage = (language) => {
    locales.changeLanguage(language);
    moment.locale(language);
  };

  const pushUrlLang = (language) => {
    const newPathName = stringifyUrl({
      url: pathname,
      query: { ...query, lang: language },
    });

    const newAsPath = stringifyUrl({
      url: asPath,
      query: { lang: language },
    });

    push(newPathName, newAsPath, {
      shallow: true,
    });
  };

  useEffect(() => {
    iniLanguage(userLang);
  }, []);

  useEffect(() => {
    if (["en", "rw"].includes(query.lang)) {
      if (isLoggedin && user.id) {
        return dispatch(
          updateProfile({
            language: `${query.lang}`,
          }),
        );
      }

      localStorage.setItem("USER_LANG", `${query.lang}`);

      iniLanguage(query.lang);
      pushUrlLang(query.lang);
    }

    if (isEmpty(query.lang) || !["en", "rw"].includes(query.lang)) {
      pushUrlLang(userLang);
    }
  }, [asPath]);

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

  return (
    <Context.Provider value={{ svpProps }}>
      {component}
      <InterCom />
    </Context.Provider>
  );
};

MyApp.getInitialProps = getInitialProps;

export default withRedux(MyApp);
