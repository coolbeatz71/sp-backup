import React, { useEffect, FC, SFC } from "react";
import Router from "next/router";
import { useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import { HOME_PATH } from "helpers/paths";
import IndexPage from "pages";

const PrivateComponent = (Component: FC<any> | SFC<any>) => {
  return () => {
    const { isLoggedin } = useSelector(
      ({ user: { currentUser } }: IRootState) => currentUser,
    );

    useEffect(() => {
      if (!isLoggedin) Router.replace(HOME_PATH);
      // tslint:disable-next-line: align
    }, [isLoggedin]);

    return isLoggedin ? <Component /> : <IndexPage />;
  };
};

export default PrivateComponent;
