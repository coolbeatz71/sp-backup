import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styles from "./login.module.scss";
import AuthLayout from "components/Auth/Layout";
import { IRootState } from "redux/initialStates";
import login from "redux/actions/Auth/login";

const Login: React.SFC<{}> = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(
    ({ auth: { login } }: IRootState) => login,
  );

  const { isLoggedin } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  useEffect(() => {
    if (isLoggedin) push("/");
  // tslint:disable-next-line: align
  }, []);

  const handleSubmit = (form: {}) => {
    login(form)(push, dispatch);
  };

  return (
    <div className={styles.login}>
      <AuthLayout
        context="login"
        handleSubmit={handleSubmit}
        formState={{ loading, error: error.message }}
      />
    </div>
  );
};

export default Login;
