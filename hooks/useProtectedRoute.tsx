import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/initialStates";
import { HOME_PATH } from "helpers/paths";
import protectedRoutes from "../constants/protectRoutes";
import getCurrentUser from "redux/actions/user/getCurrentUser";
import IndexPage from "../pages/index";

const useProtectedRoute = (pathname: string, children: ReactNode) => {
  const { replace } = useRouter();
  const dispatch = useDispatch();
  let childComponent = children;

  const { isLoggedin, loading } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  useEffect(() => {
    getCurrentUser(dispatch);
    if (!isLoggedin && protectedRoutes.includes(pathname)) {
      replace(HOME_PATH);
    }
    // tslint:disable-next-line: align
  }, [isLoggedin]);

  if (!isLoggedin && !loading && protectedRoutes.includes(pathname)) {
    childComponent = <IndexPage />;
  }

  return [childComponent];
};

export default useProtectedRoute;
