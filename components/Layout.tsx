import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRedux } from "helpers/with-redux-store";
import { Spin } from "antd";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import Header from "components/common/header";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import getCurrentUser from "redux/actions/user/getCurrentUser";
import { IRootState } from "redux/initialStates";
import { PRICING_PATH, POLICIES_PATH, HOME_PATH } from "helpers/paths";
import useProtectedRoute from "../hooks/useProtectedRoute";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "Save Plus",
}) => {
  const dispatch = useDispatch();
  const { pathname } = useRouter();
  const [childComponent] = useProtectedRoute(pathname, children);

  const { isLoggedin, loading, data, fetched } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  const isLight =
    pathname !== PRICING_PATH &&
    pathname !== POLICIES_PATH &&
    pathname !== HOME_PATH;

  useEffect(() => {
    if (!loading && isLoggedin && isEmpty(data)) {
      getCurrentUser(dispatch);
    }
    // tslint:disable-next-line: align
  }, []);

  return (
    <>
      <Header title={title} />
      {loading && !fetched && pathname !== HOME_PATH ? (
        <div className="parent-container">
          <div className="spinner">
            <Spin size="large" tip="Loading..." />
          </div>
        </div>
      ) : (
        <div>
          <Navbar isLight={isLight} page={pathname} />
          <div className="children-container">{childComponent}</div>
          <Footer />
        </div>
      )}
      <style jsx={true}>
        {`
          .parent-container {
            position: absolute;
            background: #f4fafb;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }
          .parent-container .spinner {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 80px;
            height: 80px;
          }
        `}
      </style>
    </>
  );
};

export default withRedux(Layout);
