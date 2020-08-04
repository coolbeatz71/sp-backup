import React, { useEffect, FC, SFC } from "react";
import Router from "next/router";
import { useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import { HOME_PATH } from "helpers/paths";

const PrivateComponent = (Component: FC<any> | SFC<any>) => {
  return () => {
    const { isLoggedin } = useSelector(
      ({ user: { currentUser } }: IRootState) => currentUser,
    );

    useEffect(() => {
      if (!isLoggedin) Router.replace(HOME_PATH);
      // tslint:disable-next-line: align
    }, [isLoggedin]);

    return <Component />;
  };
};

export default PrivateComponent;
