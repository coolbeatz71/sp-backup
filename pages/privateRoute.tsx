import React, { useEffect } from "react";
import Router from "next/router";
import { useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import { HOME_PATH } from "helpers/paths";

const home = `${HOME_PATH}?redirected=true`;

const PrivateComponent = (Component: React.SFC<{}>) => {
  return () => {
    const { isLoggedin } = useSelector(
      ({ user: { currentUser } }: IRootState) => currentUser,
    );

    useEffect(() => {
      if (!isLoggedin) Router.replace(home);
      // tslint:disable-next-line: align
    }, [isLoggedin]);

    return <Component />;
  };
};

export default PrivateComponent;
